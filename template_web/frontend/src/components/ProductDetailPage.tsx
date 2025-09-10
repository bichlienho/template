import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Cập nhật Type để có thêm 'link'
type Category = {
  id: number;
  name: string;
  image: string | null;
  tech_stack: string;
  description: string | null;
  price: number | null;
  link: string | null;
  rate_star: number;
  rate_buy: number;
};

const BACKEND_URL = "http://127.0.0.1:7000";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("desktop"); 

  useEffect(() => {
    if (!productId) return;

    // Gọi API chi tiết sản phẩm
    fetch(`${BACKEND_URL}/danhmuc/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [productId]);

  if (loading)
    return (
      <p style={{ textAlign: "center", paddingTop: "120px" }}>Loading...</p>
    );
  if (!product || !product.link) {
    return <p style={{ textAlign: "center", paddingTop: "120px" }}>
      Demo not found!
    </p>;
  }

  const imageUrl = product.image ? `${BACKEND_URL}/static/${product.image}` : "";

  // ✅ Các kích thước preview
  const deviceStyles: Record<string, React.CSSProperties> = {
    desktop: { width: "100%", height: "calc(100vh - 120px)", },
    tablet: { width: "768px", height: "calc(100vh - 120px)", maxHeight: "1024px", },
    mobile: { width: "375px", height: "calc(100vh - 120px)", maxHeight: "812px" },
  };

  return (
    <>
      {/* Banner */}
      <div
        className="page-heading"
        id="top"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          // minHeight: "400px",
          // transform: 'translateY(calc(-100% + 220px))',
          // transition: 'transform 10s linear',
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-content text-center text-white">
                <h1 style={{ color: "red" }}>{product.tech_stack}</h1>
                <h2 style={{ color: "black" }}>{product.name}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Area */}
      <section className="section" id="product">
        <div className="container">
          <div className="row">
            {/* Thông tin sản phẩm */}
                    <div className="col-lg-12">
                    <div className="right-content">
                        <span className="badge bg-secondary mb-2">
                        {product.tech_stack}
                        </span>
                        <h2>{product.name}</h2>
                        <p className="lead">{product.description}</p>
                        <ul className="stars">
                        <li>
                            <i className="fa fa-star"></i>
                        </li>
                        <li>
                            <i className="fa fa-star"></i>
                        </li>
                        <li>
                            <i className="fa fa-star"></i>
                        </li>
                        <li>
                            <i className="fa fa-star"></i>
                        </li>
                        <li>
                            <i className="fa fa-star"></i>
                        </li>
                        </ul>
                        <strong>Rating:</strong>
                        <small> ({product.rate_buy}/lượt mua)</small>
                        {product.link && (
                        <a href={product.link} target="_blank" rel="noopener noreferrer">
                            View demo
                        </a>
                        )}
                        <div className="quantity-content">
                        <div className="right-content">
                            <div className="quantity buttons_added">
                            <input type="button" value="-" className="minus" />
                            <input
                                type="number"
                                step="1"
                                min="1"
                                name="quantity"
                                value="1"
                                title="Qty"
                                className="input-text qty text"
                            />
                            <input type="button" value="+" className="plus" />
                            </div>
                        </div>
                        </div>
                        <div className="total">
                        <h3 className="my-3 text-primary">
                            {product.price} <em>Vnđ</em>
                        </h3>
                        <div className="main-border-button">
                            <a
                            href={`https://mail.google.com/mail/?view=cm&fs=1&to=eprojectbeginer@gmail.com&su=Đặt hàng: ${product.name}&body=Chào shop,%0D%0ATôi muốn mua sản phẩm: ${product.name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            >
                            Liên hệ
                            </a>
                        </div>
                        </div>
                    </div>
                    </div>

                    {/* Preview với chế độ thiết bị */}
                    <div className="col-lg-12 mt-4">
                    <div style={{ backgroundColor: "#f0f2f5", minHeight: "100vh", paddingTop: "80px" }}>
                            <div className="preview-container text-center">
                                {/* --- Thanh chọn chế độ --- */}
                                <div className="view-switch mb-4 d-flex justify-content-center align-items-center gap-3">
                                    <h5 className="mb-0 me-2">View As:</h5>
                                    <button
                                        className={`btn ${view === "desktop" ? "btn-primary" : "btn-light"}`}
                                        onClick={() => setView("desktop")}
                                        title="Desktop View"
                                    >
                                        🖥️  Desktop
                                    </button>
                                    <button
                                        className={`btn ${view === "tablet" ? "btn-primary" : "btn-light"}`}
                                        onClick={() => setView("tablet")}
                                        title="Tablet View"
                                    >
                                        📟 Tablet
                                    </button>
                                    <button
                                        className={`btn ${view === "mobile" ? "btn-primary" : "btn-light"}`}
                                        onClick={() => setView("mobile")}
                                        title="Mobile View"
                                    >
                                        📱 Mobile
                                    </button>
                                </div>

                                {/* --- Khung Preview --- */}
                                <div
                                    className="mx-auto border rounded-lg shadow-lg bg-white overflow-hidden"
                                    style={{
                                        ...deviceStyles[view],
                                        margin: "0 auto", // Căn giữa tuyệt đối
                                        transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)", // Hiệu ứng chuyển động mượt mà
                                    }}
                                >
                                    <iframe
                                        src={product.link}
                                        title={`Preview of ${product.name}`}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            border: "none",
                                        }}
                                    />
                                </div>
                            </div>
                    </div>
                    </div>
            </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetailPage;
