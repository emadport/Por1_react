import useAuth from 'hooks/Auth.hook';


function RequireAuth({ children }:{children:any}) {
    const { user,userLoading } = useAuth();
    return (
     <> {user?.currentUser?.id&&!userLoading? children : null}</>
    ) 
  }
  export default RequireAuth;