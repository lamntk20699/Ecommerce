import React from 'react';
// import { useEffect } from 'react';
// import "./Banner_Seceond.css";
// import { BANNER_01, BANNER_02, BANNER_03, BANNER_04, BANNER_05 } from './ShoeBanner';
// import { PREV_ARROW, NEXT_ARROW } from './BannerArrow';
import Slider from "./Slider";
import SaleAdvertisement from './SaleAdvertisement';

const Banner = () => {
    return (
        <div>
            <Slider />
            <SaleAdvertisement />
        </div>
    )
}
export default Banner;
// const Banner = () => {
//     let counter = 1;
//     useEffect(() => {
//         setInterval(function () {
//             document.getElementById('radio0' + counter).checked = true;
//             counter++;
//             if (counter > 4) { counter = 1 };
//         }, 5000);
//     }, [])

//     return (
//         <div className="banner-wrapper">
//             <div className="slider">
//                 <div className="slides">
//                     {/* Radio Button */}
//                     <input type="radio" name="radio-btn" id="radio01" />
//                     <input type="radio" name="radio-btn" id="radio02" />
//                     <input type="radio" name="radio-btn" id="radio03" />
//                     <input type="radio" name="radio-btn" id="radio04" />
//                     <input type="radio" name="radio-btn" id="radio05" />
//                     {/* Slide Image */}
//                     <div className="slide first">
//                         <img src={BANNER_01} alt="" />
//                     </div>
//                     <div className="slide">
//                         <img src={BANNER_02} alt="" />
//                     </div>
//                     <div className="slide">
//                         <img src={BANNER_03} alt="" />
//                     </div>
//                     <div className="slide">
//                         <img src={BANNER_04} alt="" />
//                     </div>
//                     <div className="slide">
//                         <img src={BANNER_05} alt="" />
//                     </div>
//                     {/* Autp Navigation */}
//                     <div className="banner-navigation-auto">
//                         <div className="auto-btn01"></div>
//                         <div className="auto-btn02"></div>
//                         <div className="auto-btn03"></div>
//                         <div className="auto-btn04"></div>
//                         <div className="auto-btn05"></div>
//                     </div>
//                 </div>
//                 {/* Manual Navigation */}
//                 <div className="banner-navigation-manual">
//                     <label htmlFor="radio01" className="manual-btn"></label>
//                     <label htmlFor="radio02" className="manual-btn"></label>
//                     <label htmlFor="radio03" className="manual-btn"></label>
//                     <label htmlFor="radio04" className="manual-btn"></label>
//                     <label htmlFor="radio05" className="manual-btn"></label>
//                 </div>
//             </div>
//         </div>
//     )
// }

