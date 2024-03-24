import { Link, useParams } from "react-router-dom";
import {useAuthStatus, useSecureRouting}  from '../helpers/Helper';
import AccountDetails from '../components/AccountDetailsComponent';

    const ProductRecommendations = () => {
        const { user } = useAuthStatus();
        useSecureRouting(user);
        const { id } = useParams();

        const products = 
        [
            
            {name: 'Thinkbaby Clear Zinc Sunscreen Lotion', SPF: '30', image: '/Thinkbaby_Clear_Zinc_Sunscreen.png', link: 'https://www.ewg.org/sunscreen/about-the-sunscreens/1060098/Thinkbaby_Clear_Zinc_Sunscreen_Lotion%2C_SPF_30/'},
            {name: 'Well People Bio Tint Tinted Moisturizer, 11W', SPF: '30', image: '/Well_People_Bio_Tint_Tinted_Moisturizer.png', link: 'https://www.ewg.org/sunscreen/about-the-sunscreens/1068173/Well_People_Bio_Tint_Tinted_Moisturizer%2C_11W%2C_SPF_30/'},
            {name: 'Solara Suncare Glow Getter Nutrient Boosted Daily Sunscreen', SPF: '30', image: '/Solara_Suncare_Glow_Getter_Nutrient.png', link: 'https://www.ewg.org/sunscreen/about-the-sunscreens/1071896/Solara_Suncare_Glow_Getter_Nutrient_Boosted_Daily_Sunscreen%2C_Naturally_Scented%2C_SPF_30/'},  
            {name: 'Love Sun Body Sheer Perfection Mineral Body Sunscreen', SPF: '30', image: '/Sun_Body_Sheer_Perfection_Mineral_Body_Sunscreen.png', link: 'https://www.ewg.org/sunscreen/about-the-sunscreens/1070566/Love_Sun_Body_Sheer_Perfection_Mineral_Body_Sunscreen%2C_Fragrance-Free%2C_SPF_30/'},  
            {name: 'Solara Suncare Clean Freak Nutrient Boosted Daily Sunscreen', SPF: '30', image: '/Solara_Suncare_Clean_Freak_Nutrient_Boosted_Daily_Sunscreen.png', link: 'https://www.ewg.org/sunscreen/about-the-sunscreens/930144/Solara_Suncare_Clean_Freak_Nutrient_Boosted_Daily_Sunscreen%2C_Unscented%2C_SPF_30/'},  
            {name: 'Babo Botanicals Daily Sheer Fluid Mineral Sunscreen Lotion', SPF: '50', image: '/Babo_Botanicals_Daily_Sheer_Fluid_Mineral_Sunscreen_Lotion.png', link: 'https://www.ewg.org/sunscreen/about-the-sunscreens/1044606/Babo_Botanicals_Daily_Sheer_Fluid_Mineral_Sunscreen_Lotion%2C_SPF_50/'},  
            {name: 'ATTITUDE Mineral Sunscreen Stick', SPF: '30', image: '/ATTITUDE_Mineral_Sunscreen_Stick.png', link: 'https://www.ewg.org/sunscreen/about-the-sunscreens/1030193/ATTITUDE_Mineral_Sunscreen_Stick%2C_Kids%2C_Face%2C_Unscented%2C_SPF_30/'},  
            {name: 'Ao Skincare 6000X Elemental Screen', SPF: '30', image: '/Ao_Skincare_6000X_Elemental_Screen.png', link: 'https://www.ewg.org/sunscreen/about-the-sunscreens/815867/Ao_Skincare_6000X_Elemental_Screen%2C_SPF_30/'},  
            {name: 'Rejuva Minerals Sheer Daily Wear Face Protection', SPF: '16', image: '/Rejuva_Minerals_Sheer_Daily_Wear_Face_Protection.png', link: 'https://www.ewg.org/sunscreen/about-the-sunscreens/996047/Rejuva_Minerals_Sheer_Daily_Wear_Face_Protection%2C_SPF_16/'},  
            {name: 'Stream2Sea EcoStick Sport Sunscreen', SPF: '35', image: '/Stream2Sea_EcoStick_Sport_Sunscreen.png', link: 'https://www.ewg.org/sunscreen/about-the-sunscreens/1045444/Stream2Sea_EcoStick_Sport_Sunscreen%2C_SPF_35%2B/'},  
            {name: 'Babo Botanicals Baby Skin Mineral Sunscreen Lotion', SPF: '50', image: '/Babo_Botanicals_Baby_Skin_Mineral_Sunscreen_Lotion.png', link: 'https://www.ewg.org/sunscreen/about-the-sunscreens/1030190/Babo_Botanicals_Baby_Skin_Mineral_Sunscreen_Lotion%2C_SPF_50_/'},  
            {name: 'Solara Suncare Fortune Teller Brightening Sunscreen Serum', SPF: '30', image: '/Solara_Suncare_Fortune_Teller_Brightening_Sunscreen_Serum.png', link: 'https://www.ewg.org/sunscreen/about-the-sunscreens/1071897/Solara_Suncare_Fortune_Teller_Brightening_Sunscreen_Serum%2C_SPF_30/'},  
            {name: 'Daily Defense Soothing Mineral Face Sunscreen', SPF: '30', image: '/Daily_Defense_Soothing_Mineral_Face_Sunscreen.png', link: 'https://www.ewg.org/sunscreen/about-the-sunscreens/986100/Solara_Suncare_Go%21_Daily_Defense_Soothing_Mineral_Face_Sunscreen%2C_SPF_30/'},  
            {name: 'Stream2Sea Every Day Mineral Sunscreen', SPF: '45', image: '/Stream2Sea_Every_Day_Mineral_Sunscreen.png', link: 'https://www.ewg.org/sunscreen/about-the-sunscreens/1045440/Stream2Sea_Every_Day_Mineral_Sunscreen%2C_Shimmer%2C_SPF_45/'},  
            {name: 'Well People Bio Tint Tinted Moisturizer, 6W', SPF: '30', image: '/Well_People_Bio_Tint_Tinted_Moisturizer_6W.png', link: 'https://www.ewg.org/sunscreen/about-the-sunscreens/1068168/Well_People_Bio_Tint_Tinted_Moisturizer%2C_6W%2C_SPF_30/'},  
            {name: 'Solara Suncare Time Traveler Ageless Daily Face Sunscreen', SPF: '30', image: '/Solara_Suncare_Time_Traveler_Ageless_Daily_Face_Sunscreen.png', link: 'https://www.ewg.org/sunscreen/about-the-sunscreens/924597/Solara_Suncare_Time_Traveler_Ageless_Daily_Face_Sunscreen%2C_Unscented%2C_SPF_30/'},  
        
        ];

    return ( 
        <div>
            <AccountDetails />
            <div className='titleContainer bloglink header'>
                <div><h2><Link to={'/userpage/' + id + '/news'}>News</Link></h2></div>
                <div><h2>||</h2></div>
                <div><h2><Link to={'/userpage/' + id + '/products'}>Products</Link></h2></div>
            </div>
            <div className='cardRow'>
                    {products.map((product, i) => (
                        <div className="bloglink" key={i}>
                        <Link to={product.link}>
                            <div className='card'>
                                <img className='cardImage' src={product.image} alt="Sunscreen Bottle"/>
                                <div className='cardName'>
                                    <p><b>{product.name}</b></p>
                                    <p>SPF: {product.SPF}</p>
                                </div>
                            </div>
                        </Link>
                        </div>
                    ))}
            </div>
        </div>
     );
}
 
export default ProductRecommendations;