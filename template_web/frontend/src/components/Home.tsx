import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import banner1 from '../assets/images/banner1.png';
import banner from '../assets/images/banner.png';
import banner3 from '../assets/images/banner3.png';
import tem4 from '../assets/images/tem4.png';
import tem2 from '../assets/images/tem2.png';
import banner5 from '../assets/images/banner5.png';
import banner6 from '../assets/images/banner6.png';
import dakd2 from '../assets/images/dakd2.png';
import dakd from '../assets/images/dakd.png';


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


function Home( ) {
    // URL của Flask API
        const API_URL = 'http://127.0.0.1:7000/danhmuc'; // Sử dụng endpoint API của bạn
        const BACKEND_URL = 'http://127.0.0.1:7000'; // Base URL của backend để lấy ảnh

  // State để lưu danh sách categories
        const [categories, setCategories] = useState<Category[]>([]);
  // State để xử lý trạng thái loading
        const [loading, setLoading] = useState<boolean>(true);
  // State để xử lý lỗi
        const [error, setError] = useState<string | null>(null);

  // useEffect sẽ chạy một lần khi component được tải
        useEffect(() => {
            const fetchCategories = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                const data: Category[] = await response.json();
                setCategories(data); // Cập nhật state với dữ liệu nhận được
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false); // Dừng loading dù thành công hay thất bại
            }
            };

            fetchCategories();
        }, []); // Mảng rỗng `[]` đảm bảo effect này chỉ chạy 1 lần

        // Xử lý các trạng thái giao diện
        if (loading) {
            return <div className="status-message">Loading products...</div>;
        }

        if (error) {
            return <div className="status-message error">Error: {error}</div>;
        }

        // --- LOGIC LỌC DỮ LIỆU ---
        // Lọc ra các sản phẩm theo từng tech_stack
        const htmlTemplates = categories.filter(
            (cat) => cat.tech_stack.toLowerCase() === 'html'
        );

        const reactTemplates = categories.filter(
            (cat) => cat.tech_stack.toLowerCase() === 'react'
        );

        const nextjsTemplates = categories.filter(
            (cat) => cat.tech_stack.toLowerCase() === 'nextjs'
        );


    // Hàm render danh sách sản phẩm từ API
   // Hàm render một sản phẩm (tái sử dụng)
        const renderProductItem = (category: Category) => {
            const imageUrl = category.image 
            ? `http://127.0.0.1:7000/static/${category.image}` 
            : "/assets/images/placeholder.jpg";
            // Tạo đường dẫn động cho trang chi tiết theo tech_stack
            const techStackUrl = `/templates/${category.tech_stack.toLowerCase()}`;
            return (
                <div key={category.id} className="item col-lg-3 col-md-6 col-sm-12">
                    <div className="thumb1">
                        <img src={imageUrl} alt={category.name} />
                    </div>
                    <div className="down-content">
                        <h4>{category.name}</h4>
                         <ul className="stars">
                           {/* Bạn có thể thêm logic để hiển thị đúng số sao */}
                           <li><i className="fa fa-star"></i></li>
                           <li><i className="fa fa-star"></i></li>
                           <li><i className="fa fa-star"></i></li>
                           <li><i className="fa fa-star"></i></li>
                           <li><i className="fa fa-star"></i></li>
                        </ul>
                        <span >{category.rate_star}/lượt mua</span>
                        <p >{category.tech_stack}</p>
                        <div className="price-container">
                            {/* --- ĐÂY LÀ LINK "XEM THÊM" ĐỘNG --- */}
                            <Link to={techStackUrl} className="view-more-link">
                                Xem thêm
                            </Link>
                            <span >{category.price} <em>Vnđ</em></span>
                        </div>
                    </div>
                </div>
            );
        };
   

    return (
        <div>
            
        {/* <!-- ***** Main Banner Area Start ***** --> */}
        <div className="main-banner" id="top">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="left-content">
                            <a href="https://www.facebook.com/groups/doankhongdong/" target="_blank" rel="noopener noreferrer">
                                        Tham gia nhóm
                            </a>
                            <div className="thumb">
                                <img src={banner1} alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="right-content">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="right-first-image">
                                        <div className="thumb">
                                            <img src={banner} style={{width:'350px'}}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="right-first-image">
                                        <div className="thumb">
                                            <img src={tem2} style={{width:'350px'}}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="right-first-image">
                                        <div className="thumb">
                                            <img src={banner3} style={{width:'350px'}}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="right-first-image">
                                        <div className="thumb">
                                            <img src={tem4} style={{width:'350px'}}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="right-first-image">
                                        <div className="thumb">
                                            <img src={banner5} style={{width:'350px'}}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="right-first-image">
                                        <div className="thumb">
                                            <img src={banner6} style={{width:'350px'}}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- ***** Main Banner Area End ***** --> */}

        {/* <!-- ***** Men Area Starts ***** --> */}
        <section className="section" id="men">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="section-heading">
                            <h2>HTML Templates</h2>
                            <span>Our latest templates built with HTML & CSS.</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    {/* Gọi hàm để render sản phẩm từ API */}
                       {htmlTemplates.slice(0, 4).map(renderProductItem)}
                </div>
            </div>
        </section>
        {/* <!-- ***** Men Area Ends ***** -->

        <!-- ***** Women Area Starts ***** --> */}
        <section className="section" id="women">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="section-heading">
                            <h2>React Templates</h2>
                    <span>Our latest templates built with React.</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    {reactTemplates.slice(0, 4).map(renderProductItem)}
                </div>
            </div>
        </section>
        {/* <!-- ***** Women Area Ends ***** -->

        <!-- ***** Kids Area Starts ***** --> */}
        <section className="section" id="kids">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="section-heading">
                             <h2>Next.js Templates</h2>
                    <span>Our latest templates built with Next.js.</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                     {nextjsTemplates.slice(0, 4).map(renderProductItem)}
                </div>
            </div>
        </section>
        {/* <!-- ***** Kids Area Ends ***** -->

        <!-- ***** Explore Area Starts ***** --> */}
        <section className="section" id="explore">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="left-content">
                            <h2>Khám phá sản phẩm của chúng tôi</h2>
                            <span>Bạn đang đau đầu vì đồ án sắp tới?
                                 Bạn muốn có một bài thuyết trình PowerPoint chuyên nghiệp để gây ấn tượng với giảng viên nhưng không có thời gian?
                                 Chúng tôi cung cấp giải pháp toàn diện giúp bạn tiết kiệm thời gian, tự tin thuyết trình và đạt điểm số cao</span>
                            <div className="quote">
                                <i className="fa fa-quote-left"></i>
                                   <p>Thiết kế Slide Thuyết Trình: Đồ án, bài tập lớn, bảo vệ khóa luận. Cam kết slide đẹp, bố cục rõ ràng, nội dung súc tích.

                                    Thiết kế Template Word: Báo cáo thực tập, tiểu luận, khóa luận. Chuẩn form, trình bày sạch sẽ, chuyên nghiệp.

                                    Làm Website Đồ Án: Nhận code website tĩnh và động theo yêu cầu cho các đồ án công nghệ thông tin.</p>
                                 <i className="fa fa-quote-right"></i>
                                
                            </div>
                            <p>Nếu bạn cần thiết kế Template theo chủ đề hay Đồ án chúng tôi luôn sẵn sàng nhận theo yêu cầu, 
                                giá cả rẻ như hạt dẻ.
                                
                            </p>
                           <div className="contact-box">
                                <h3>Liên hệ mua ngay</h3>
                                <p>Bạn muốn sở hữu template này? Hãy nhấn vào nút dưới để gửi mail đặt hàng ngay!</p>
                                <a  href={`https://mail.google.com/mail/?view=cm&fs=1&to=eprojectbeginer@gmail.com&su=Đặt hàng: &body=Chào shop,%0D%0ATôi muốn mua sản phẩm:`}
                                            target="_blank"
                                            rel="noopener noreferrer" 
                                    className="btn-buy">
                                    📩 Gửi Email Mua Ngay
                                </a>
                                <p>Hoặc tham gia nhóm Facebook để nhận thêm nhiều mẫu miễn phí 👉 
                                    <a href="https://www.facebook.com/groups/doankhongdong" target="_blank">Tham gia ngay</a>
                                </p>
                            </div>

                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="right-content">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="leather">
                                        <h4>Kho Template Projects </h4>
                                        <span>Tiết kiệm thời gian hoàn thành đồ án</span>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="first-image">
                                        <a href="https://www.facebook.com/groups/doankhongdong" target="_blank">
                                                <img src={dakd2} alt=""/>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="second-image">
                                        <a href="https://www.facebook.com/groups/doankhongdong" target="_blank">
                                                <img src={dakd} alt=""/>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="leather">
                                        <h4>Đa Dạng mẫu </h4>
                                        <span>Đầy đủ từ Code đến Documents </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </div>
    )
}

export default Home
