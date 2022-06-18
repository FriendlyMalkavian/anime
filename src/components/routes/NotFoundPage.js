import './NotFound.css'

function NotFound() {
    return (
        <div className="NotFoundPage" height={window.innerHeight} width={window.innerWidth}>
            <div>
                <h2 className='h2'>Error 404</h2>
                <h1 className='h1'>Page not Found</h1>
            </div>
        </div>
    );
}

export default NotFound