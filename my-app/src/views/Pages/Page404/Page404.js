import React, {Component} from 'react';

class Page404 extends Component {


    render() {
        return (
            <div>
                <h2 className="text-center">Page not found</h2>
                <p id="errorContent" className="text-center">The page you are looking for does not exist</p>
            </div>
        )
    };
}

export default Page404;