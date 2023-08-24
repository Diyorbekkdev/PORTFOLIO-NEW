import { Fragment} from "react"
import { Outlet } from "react-router-dom"


//styles for default layout
import './defaultLayout.scss';
import DefaultHeader from "../../components/header/DefaultHeader";
const DefaultLayout = () => {
  

 

  return (
    <Fragment>
      <div className="default__layout__wrapper">
        <DefaultHeader/>
        <main>
          <Outlet/>
        </main>
        
      </div>
    </Fragment>
  )
}

export default DefaultLayout