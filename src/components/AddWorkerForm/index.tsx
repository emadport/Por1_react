

import "./AddWorkerForm.styles.scss";
import { AiFillMinusCircle } from "react-icons/ai";
import {  FaUser } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import {  User } from "generated/graphql";


function AddWorkerForm({
  usersArray,
  theme,
  onAdd,
  workers
}: {
  usersArray: User[];
  theme?: string;
  onAdd: (worker: any) => void;
  workers: User[];
}) {




  function onAddWorker(user: any) {
    const isUserAdded = workers.some(
      (worker: any) => worker.username === user.username
    );

    if (!isUserAdded) {
      onAdd([...workers, user]);
    } else {
      return;
    }
  }
function onMinusWorker(user: any) {
  const updatedWorkers = workers.filter((worker: any) => worker.username !== user.username);
  onAdd(updatedWorkers);
}


  return (
    <div className="add-wroker-form">
      {usersArray?.map((user) => (
        <div key={user?.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{display:'flex',justifyContent:'flex-start',alignItems:'flex-end'}}> <span>
            <FaUser
              className="addWorker-screen__icon icon"
              color={theme}
            />
          </span>
          <span style={{color:theme==='light'?'#282828':'inherit'}}>
            {user?.username}
          </span></div>
         
          <span>
            {workers?.length&&workers.some(
              (worker: User) => worker.username === user?.username
            ) ? (
              <AiFillMinusCircle
                className="project-screen__icon icon"
                color={theme}
                onClick={()=>onMinusWorker(user)}
              />
            ) : (
              <IoAddCircle
                color={theme}
                className="project-screen__icon icon"
                onClick={() => onAddWorker(user)}
              />
            )}
          </span>
        </div>
      ))}
    </div>
  );
}

export default AddWorkerForm;
