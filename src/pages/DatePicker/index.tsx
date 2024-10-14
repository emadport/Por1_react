import { Calendar } from 'react-date-range';
import "./DatePicker.scss"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';

const DatePicker=()=>{
    return (<div className='DatePicker-wrapper'>   <Calendar 
        date={new Date()}
        displayMode='dateRange'
        ranges={[]}  
                     
        onChange={()=>null}
      /></div>)
}
export default DatePicker;