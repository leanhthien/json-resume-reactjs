let baseOnRole = (roleId)=>{
    let routes = {items: []}
    
    routes.items.push(
      {
        name: 'Login',
        url: '/Login'
      }
    );
    routes.items.push(
      {
        name: 'Register',
        url: '/Register'
      }
    );
    
    return routes;
  }
  
  export default baseOnRole