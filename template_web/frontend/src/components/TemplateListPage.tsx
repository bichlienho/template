// src/pages/TemplateListPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

// ... (Type Category và hàm renderProductItem có thể tái sử dụng) ...
type Category = {
  id: number;
  name: string;
  image: string | null; // Có thể là null nếu không có ảnh
  tech_stack: string;
  description: string | null;
  price : number;
  rate_star: number;
  rate_buy: number;
};

// Hàm render một sản phẩm (tái sử dụng)
        const renderProductItem = (category: Category) => {
            const imageUrl = category.image 
            ? `http://127.0.0.1:7000/static/${category.image}` 
            : "/assets/images/placeholder.jpg";
            return (
                <div key={category.id} className="item col-lg-3 col-md-6 col-sm-12">
                    <div className="thumb1">
                        <img src={imageUrl} alt={category.name} />
                    </div>
                    <div className="down-content">
                         <ul className="stars">
                           {/* Bạn có thể thêm logic để hiển thị đúng số sao */}
                           <li><i className="fa fa-star"></i></li>
                           <li><i className="fa fa-star"></i></li>
                           <li><i className="fa fa-star"></i></li>
                           <li><i className="fa fa-star"></i></li>
                           <li><i className="fa fa-star"></i></li>
                        </ul><br />
                        <h4>{category.name} </h4>
                        
                        <span >{category.rate_star}/lượt mua</span>
                        <p >{category.tech_stack}</p>
                        <div className="price-container">
                            <Link to={`/product/${category.id}`} className="view-more-link">
                               Xem thực tế
                            </Link>
                            <span >{category.price} <em>Vnđ</em></span>
                        </div>
                    </div>
                </div>
            );
        };
   
const TemplateListPage = () => {
    const { techStack } = useParams(); // Lấy techStack từ URL, ví dụ: "html", "react"
    const [templates, setTemplates] = useState<Category[]>([]);
    
    useEffect(() => {
        // Gọi API để lấy tất cả, sau đó lọc ở frontend
        fetch('http://127.0.0.1:7000/danhmuc')
            .then(res => res.json())
            .then((data: Category[]) => {
                const filtered = data.filter(
                    cat => cat.tech_stack.toLowerCase() === techStack?.toLowerCase()
                );
                setTemplates(filtered);
            });
    }, [techStack]); // Chạy lại effect khi techStack thay đổi

    return (
        <>
            {/* // <!-- ***** Main Banner Area Start ***** --> */}
            <div className="page-heading" id="top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="inner-content">
                                <h2 style={{color:'black'}}>{techStack?.toUpperCase()} Templates</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* // <!-- ***** Main Banner Area End ***** -->


            // <!-- ***** Products Area Starts ***** --> */}
            <section className="section" id="products">
                <div className="container" style={{ paddingTop: '100px' }}>
                    <h2 style={{color:'black',padding:'25px'}}>{techStack?.toUpperCase()} Templates</h2>
                    <div className="row">
                        {/* Hiển thị tất cả sản phẩm đã lọc */}
                        {templates.map(renderProductItem)}
                        <div className="col-lg-12">
                                <div className="pagination">
                                    <ul>
                                        <li>
                                            <a href="#">1</a>
                                        </li>
                                        <li className="active">
                                            <a href="#">2</a>
                                        </li>
                                        <li>
                                            <a href="#">3</a>
                                        </li>
                                        <li>
                                            <a href="#">4</a>
                                        </li>
                                        <li>
                                            <a href="#">Next</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                    </div>
                </div>
            </section>
            {/* <!-- ***** Products Area Ends ***** --> */}
        </>
    );
};

export default TemplateListPage;