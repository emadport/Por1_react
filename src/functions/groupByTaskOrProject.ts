import { GetUserTimesQuery, SubTime } from "generated/graphql";

const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};

const minutesToTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
};

function groupByProject(times: GetUserTimesQuery) {
    const grouped = times.getUserTimes.flatMap((r): any => {
        if (!r?.subTimes) return [];

        return (r.subTimes as SubTime[]).reduce(
            (
                acc: Record<
                    string,
                    {
                        timeSpend: string;
                        fromHomeTime: number;
                        task: string;
                        project: string;
                        fromHome: boolean;
                    }[]
                >,
                cur: SubTime
            ) => {


                // Normalize project key by trimming and converting to lowercase
                const projectKey = cur!.project!.trim().toLowerCase();

                if (
                    typeof cur.timeSpend !== "string" ||
                    typeof cur.task !== "string" ||
                    typeof cur.project !== "string"
                ) {
                    return acc;
                }

                // Initialize the project entry if it doesn't exist
                if (!acc[projectKey]) {
                    acc[projectKey] = [];
                }

                // Find existing project in the array
                const existingProject = acc[projectKey].find(
                    (item) => item.project.trim().toLowerCase() === projectKey
                );

                const currentMinutes = timeToMinutes(cur.timeSpend);

                if (existingProject) {
                    const existingMinutes = timeToMinutes(
                        existingProject.timeSpend
                    );
                    existingProject.timeSpend = minutesToTime(
                        existingMinutes + currentMinutes
                    );
                    if (cur.fromHome) {
                        existingProject.fromHomeTime += currentMinutes;
                    }
                } else {
                    acc[projectKey].push({
                        timeSpend: cur.timeSpend,
                        fromHomeTime: cur.fromHome ? currentMinutes : 0,
                        task: cur.task,
                        project: cur.project.trim(), // Store normalized value
                        fromHome: cur.fromHome as boolean,
                    });
                }

                return acc;
            },
            {}
        );
    });
    let returnedGroup;


    const groupedMap = new Map();

    // Step 2: Iterate over the data array and group items by key
    grouped.forEach(item => {
        const [key, value] = Object.entries(item)[0];

        if (!groupedMap.has(key)) {
            groupedMap.set(key, []);
        }

        const existingArray = groupedMap.get(key);

        (value as any).forEach((entry: any) => {
            // Find existing entry in the current key array
            const existingEntry = existingArray.find((e: any) => e.project === entry.project);

            const currentMinutes = timeToMinutes(entry.timeSpend);

            if (existingEntry) {
                // Merge timeSpend and fromHomeTime
                const existingMinutes = timeToMinutes(existingEntry.timeSpend);
                existingEntry.timeSpend = minutesToTime(existingMinutes + currentMinutes);
                existingEntry.fromHomeTime += entry.fromHomeTime;
            } else {
                // Add new entry to the array
                existingArray.push({ ...entry });
            }
        });
    });

    // Step 3: Convert the Map back to an array of objects
    const resultArray = Array.from(groupedMap.entries()).map(([key, value]) => ({ [key]: value }));


    return resultArray;
}


function groupByTask(times: GetUserTimesQuery) {
    // Step 1: Group by project and task
    const grouped = times.getUserTimes.flatMap((r): any => {
        if (!r?.subTimes) return [];

        return (r.subTimes as SubTime[]).reduce(
            (
                acc: Record<
                    string,
                    {
                        timeSpend: string;
                        fromHomeTime: number;
                        task: string;
                        project: string;
                        fromHome: boolean;
                    }[]
                >,
                cur: SubTime
            ) => {
                // Normalize task key by trimming and converting to lowercase
                const taskKey = cur!.task!.trim().toLowerCase();

                if (
                    typeof cur.timeSpend !== "string" ||
                    typeof cur.task !== "string" ||
                    typeof cur.project !== "string"
                ) {
                    return acc;
                }

                // Initialize the task entry if it doesn't exist
                if (!acc[taskKey]) {
                    acc[taskKey] = [];
                }

                // Find existing entry in the task array
                const existingTask = acc[taskKey].find(
                    (item) => item.task.trim().toLowerCase() === cur.task!.trim().toLowerCase()
                );

                const currentMinutes = timeToMinutes(cur.timeSpend);

                if (existingTask) {
                    const existingMinutes = timeToMinutes(
                        existingTask.timeSpend
                    );
                    existingTask.timeSpend = minutesToTime(
                        existingMinutes + currentMinutes
                    );
                    if (cur.fromHome) {
                        existingTask.fromHomeTime += currentMinutes;
                    }
                } else {
                    acc[taskKey].push({
                        timeSpend: cur.timeSpend,
                        fromHomeTime: cur.fromHome ? currentMinutes : 0,
                        task: cur.task.trim(), // Store normalized value
                        project: cur.project.trim(),
                        fromHome: cur.fromHome as boolean,
                    });
                }

                return acc;
            },
            {}
        );
    });

    // Step 2: Aggregate by task
    const groupedMap = new Map<string, any[]>();

    grouped.forEach(item => {
        const [key, value] = Object.entries(item)[0];

        if (!groupedMap.has(key)) {
            groupedMap.set(key, []);
        }

        const existingArray = groupedMap.get(key);

        (value as any).forEach((entry: any) => {
            // Find existing entry in the current task array
            const existingEntry = existingArray!.find((e) => e.task === entry.task);

            const currentMinutes = timeToMinutes(entry.timeSpend);

            if (existingEntry) {
                // Merge timeSpend and fromHomeTime
                const existingMinutes = timeToMinutes(existingEntry.timeSpend);
                existingEntry.timeSpend = minutesToTime(existingMinutes + currentMinutes);
                existingEntry.fromHomeTime += entry.fromHomeTime;
            } else {
                // Add new entry to the array
                existingArray!.push({ ...entry });
            }
        });
    });

    // Step 3: Convert the Map back to an array of objects
    const resultArray = Array.from(groupedMap.entries()).map(([key, value]) => ({ [key]: value }));

    return resultArray;
}
export { groupByProject, groupByTask }

