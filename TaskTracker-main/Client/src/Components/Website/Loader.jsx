import HashLoader
from "react-spinners/HashLoader";
import '../../CSS/App.css'

export default function Loader() {
  return (
    <div className="Loader">
    <HashLoader
        color={'#0000FF'}
        loading={true}
        size={100}
    />
    </div>
  )
}
