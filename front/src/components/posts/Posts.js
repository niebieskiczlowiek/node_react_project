import { useState, useEffect } from 'react';
import './Posts.scss';

const Posts = () => {
    const [postsList, setPostsList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [choosenCategory, setChoosenCategory] = useState('ALL');

    useEffect(() => {
        const getPosts = async () => {
            const response = await fetch('/api/posts');
            const data = await response.json();

            if (data.success) {
                const posts = data.posts;

                setPostsList(posts);

                const categoriesHelper = [];

                posts.forEach(post => {
                    if (!categoriesHelper.includes(post.category)) {
                        categoriesHelper.push(post.category);
                    }
                });
                setCategories(categoriesHelper);
            }
        };
        getPosts();
    }, []);
    return (
        <div className='posts-container container'>
            <div className='categories'>
                <div onClick={() => setChoosenCategory('ALL')}
                     className={'category ' + ('ALL' === choosenCategory ? 'active' : '')}>Wszystkie</div>
                {categories.map((category, index) => {   
                    return <div key={index}
                                onClick={() => setChoosenCategory(category)}
                                className={'category ' + (category === choosenCategory ? 'active' : '')}>{category}</div>;
                })}
            </div>
            {postsList
                .filter(post => post.category === choosenCategory || choosenCategory === 'ALL')
                .map(post => {
                return <div key={post.id} className='post'>
                    <h2>{post.category}</h2>
                    <p>{post.text}</p>
                </div>
            })}
        </div>
    )
};

export default Posts;