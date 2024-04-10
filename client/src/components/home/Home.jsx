

// import { Grid } from "@mui/material"

// import Banner from "../bannner/Banner"
// import Categories from "./Categories"


// const Home = () => {
//     return (<div>
//         <Banner />
//         <Grid container>
//             <Grid item lg={2} xs={12} sm={2}>
//                 <Categories />
//             </Grid>
//             <Grid container item xs={12} sm={10} lg={10}>
//                 posts
//             </Grid>
//         </Grid>
//     </div>
//     )
// }

// export default Home
import React from "react";
import { Grid } from "@mui/material";
import Banner from "../bannner/Banner";
import Categories from "./Categories";
import Posts from "./post/posts";

const Home = () => {
    return (
        <div>
            <Banner />
            <Grid container>
                <Grid item lg={2} xs={12} sm={2}>
                    <Categories />
                </Grid>
                <Grid item xs={12} sm={10} lg={10}>
                    <Posts/>
                </Grid>
            </Grid>
        </div>
    );
};

export default Home;
