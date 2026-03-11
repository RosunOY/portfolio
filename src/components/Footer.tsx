export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-wechat">
        <img
          src="/portfolio/wechat-qrcode.jpg"
          alt="微信公众号二维码"
          className="footer-wechat-qrcode"
        />
        <div className="footer-wechat-info">
          <p className="footer-wechat-name">微信公众号</p>
          <p className="footer-wechat-title">为有源头游戏来</p>
        </div>
      </div>
      <p>© 2026 欧阳志胜 · 个人网站</p>
    </footer>
  );
}
