import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import {useAuthStatus, useSecureRouting}  from '../helpers/Helper';
import AccountDetails from '../components/AccountDetailsComponent';

    const News = () => {
        const { user } = useAuthStatus();
        useSecureRouting(user);

        const { id } = useParams();
        const [isPending, setIsPending] = useState(true);
        const[articles, setArticle] = useState([]);

        useEffect(() => {
            const checkNews = async () => {
            try {
                const response = await fetch(`http://localhost:3000/userpage/${id}/news`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                } else {
                    const data = await response.json();
                    setArticle(data.articles);
                    setIsPending(false);
                }
                
            } catch (error) {
                console.log(error.message);
            }
        };
        checkNews();
    }, []);

    console.log(articles);

    return ( 
        <div>
            <AccountDetails />
            <div className='titleContainer bloglink'>
                <div><h2><Link to={'/userpage/' + id + '/news'}>News</Link></h2></div>
                <div><h2>||</h2></div>
                <div><h2><Link to={'/userpage/' + id + '/products'}>Products</Link></h2></div>
            </div>
            {isPending && <p>Fetching Blogs...</p>}
            <div>
            {!isPending && <div className="blogContainer bloglink">
                {articles.map((item, i) => (
                <Link to={item.item.link} key={i}>
                <p className="blogtitle">{item.item.title}</p>
                <p className="blogsnippet">{item.item.contentSnippet}</p>
                <p className="blogdate">{item.item.pubDate}</p>
                <br></br>
                </Link>
            ))}</div>}
            </div>
        </div>
     );
}
 
export default News;