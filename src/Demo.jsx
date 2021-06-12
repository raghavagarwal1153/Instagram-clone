import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import './index.css'
import Upload from './Upload.jsx'
function Demo(props){
  return (<>
  <Upload/>
  <div className="keshav">
 <div className="demo">
  <AccountCircleRoundedIcon style={{marginLeft:"12px"}}/> <span className="user"> {props.username}</span>
  </div>
  <img  className="image" src={props.image} alt="instagram"/>
  <h5 >{props.username}{props.caption} </h5>
  
  </div>
  </>)
}
export default Demo