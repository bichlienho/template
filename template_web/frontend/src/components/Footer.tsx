import React from 'react'
import logo from '../assets/images/logo.png'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {/* Logo + Title */}
          <div className="col-lg-6 footer-left">
            <a href="/" className="logo">
              <img src={logo} alt="Logo" />
            </a>
            <h2>KHO TEMPLATES PROJECT CHO SINH VIÊN</h2>
          </div>

          {/* Contact box */}
          <div className="col-lg-6 footer-right">
            <div className="contact-box">
              <h3>Liên hệ mua ngay</h3>
              <p>Bạn muốn sở hữu template? Nhấn nút dưới để gửi mail đặt hàng ngay!</p>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=eprojectbeginer@gmail.com&su=Đặt hàng: &body=Chào shop,%0D%0ATôi muốn mua sản phẩm:`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-buy"
              >
                📩 Gửi Email Mua Ngay
              </a>
              <p className="fb-link">
                Hoặc tham gia nhóm Facebook để nhận thêm nhiều mẫu miễn phí <br />👉{" "}
                <a href="https://www.facebook.com/groups/doankhongdong" target="_blank" rel="noopener noreferrer">
                  Tham gia ngay
                </a>
              </p>
            </div>
          </div>

          {/* Under footer */}
          <div className="col-lg-12">
            <div className="under-footer">
              <p>
                © 2025 Kho Template Project cho sinh viên - All Rights Reserved.
                <br />
                Design:{" "}
                <a href="https://www.facebook.com/groups/doankhongdong" target="_parent">
                  ĐỒ ÁN KHÔNG ĐỒNG
                </a>
              </p>
              <ul>
                <li>
                  <a href="https://www.facebook.com/groups/doankhongdong" target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/@tuhoclaptrinhtuadenz" target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-youtube"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
