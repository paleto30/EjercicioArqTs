
import { CreateApp } from "./app";


const Main = () => {    
    const app = new CreateApp();
    app.listen(4500);
}


Main();