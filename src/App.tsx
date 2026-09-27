import { useState, type FormEvent } from 'react'

const asset = (name: string) => `/assets/${name}`

const navItems = [
  { label: 'ĐẦU TƯ', href: '#goi-dau-tu', dropdown: true },
  { label: 'CỬA HÀNG', href: '#ung-dung' },
  { label: 'THEO DÕI SẢN XUẤT', href: '#quy-trinh' },
  { label: 'VỀ CHÚNG TÔI', href: '#ve-chung-toi', dropdown: true },
  { label: 'LIÊN HỆ', href: '#lien-he' },
]

const packages = [
  { label: 'Chu kỳ (Term)', first: '45 – 60 ngày', second: '6 tháng – 1 năm' },
  { label: 'Mức đầu tư (Price)', first: '2.500.000 ₫', second: '50.000.000 ₫' },
  { label: 'Lợi nhuận ước tính', first: '450.000 ₫', second: '14% ROI + Giảm 15% sỉ' },
  { label: 'Tỷ suất LN (%/năm)', first: '18% – 24% / năm', second: '14%' },
  { label: 'Tổng hoàn vốn', first: 'Xem bảng tính', second: 'Xem hợp đồng', link: true },
  { label: 'Tình trạng', first: 'Còn 120 slot', second: 'Còn hàng' },
]

const steps = [
  { number: '1', title: 'Đầu tư cùng CrabShare', detail: 'Lựa chọn batch và mua slot cua tại các trang trại công nghệ cao qua nền tảng CrabShare.' },
  { number: '2', title: 'Theo dõi minh bạch', detail: 'Hệ thống RAS tự động ghi nhận tăng trưởng, giám sát chất lượng nước, độ mặn và hình ảnh thực tế 24/7.' },
  { number: '3', title: 'Thu hoạch và chia sẻ doanh thu', detail: 'Cua được thu hoạch và bán qua đối tác của CrabShare và chuỗi nhà hàng; bạn nhận lợi nhuận trực tiếp vào ví đầu tư.' },
]

const faqs = [
  { question: 'Tôi có thể theo dõi cua của mình như thế nào?', answer: 'Bản demo giới thiệu dashboard theo dõi camera, chỉ số nước và nhật ký tăng trưởng của từng box nuôi.' },
  { question: 'Lợi nhuận được tính ra sao?', answer: 'Mức lợi nhuận trên giao diện là số liệu minh họa theo thiết kế. Kết quả thực tế phụ thuộc sản lượng thu hoạch và điều khoản hợp đồng.' },
  { question: 'CrabShare sử dụng công nghệ gì?', answer: 'Thiết kế giới thiệu hệ thống nuôi tuần hoàn RAS, giúp theo dõi môi trường nuôi và quy trình chăm sóc.' },
]

type Dialog = 'intro' | 'contact' | 'login' | 'faq' | 'batch' | 'offtake' | null

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dialog, setDialog] = useState<Dialog>(null)
  const [submitted, setSubmitted] = useState(false)
  const [activeFaq, setActiveFaq] = useState(0)
  const [testimonial, setTestimonial] = useState(1)

  const openDialog = (next: Dialog) => {
    setSubmitted(false)
    setDialog(next)
    setMenuOpen(false)
  }

  const closeDialog = () => setDialog(null)

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-white text-[#171717]">
      <header id="dau-trang" className="hero relative isolate flex min-h-[780px] flex-col text-white">
        <div className="hero-shade absolute inset-0 -z-10" />
        <nav className="page-container flex items-center justify-between gap-6 pt-6" aria-label="Điều hướng chính">
          <a className="flex shrink-0 items-center gap-3" href="#dau-trang" aria-label="CrabShare, về đầu trang">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-white/80 bg-black/20">
              <img src={asset('imgSvg.svg')} alt="" />
            </span>
            <span className="flex flex-col leading-none">
              <strong className="text-xs tracking-[0.1em]">CRAB</strong>
              <strong className="mt-1 text-sm tracking-[0.05em]">SHARE</strong>
              <small className="mt-1 text-[8px] tracking-tight text-amber-100">NUÔI CUA · ĐẦU TƯ · LỢI NHUẬN</small>
            </span>
          </a>
          <div className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <a key={item.label} className="nav-link" href={item.href}>
                {item.label}
                {item.dropdown && <img src={asset('imgContainer3.svg')} alt="" />}
              </a>
            ))}
          </div>
          <div className="hidden items-center gap-3 lg:flex">
            <button className="pill-button border border-white/50 px-5 py-2 text-[11px]" onClick={() => openDialog('login')}>ĐĂNG NHẬP</button>
            <button className="pill-button bg-white px-5 py-2 text-[11px] text-black" onClick={() => openDialog('contact')}>ĐĂNG KÝ</button>
          </div>
          <button className="rounded-full border border-white/50 px-4 py-2 text-xs font-bold lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-menu">
            {menuOpen ? 'ĐÓNG' : 'MENU'}
          </button>
        </nav>

        {menuOpen && (
          <div id="mobile-menu" className="page-container absolute inset-x-0 top-[82px] z-20">
            <div className="flex flex-col gap-2 rounded-2xl border border-white/20 bg-[#171717] p-5 shadow-2xl">
              {navItems.map((item) => <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)} className="py-2 text-xs font-semibold tracking-wider">{item.label}</a>)}
              <div className="mt-2 flex gap-2">
                <button className="pill-button border border-white/40 px-4 py-2 text-xs" onClick={() => openDialog('login')}>ĐĂNG NHẬP</button>
                <button className="pill-button bg-white px-4 py-2 text-xs text-black" onClick={() => openDialog('contact')}>ĐĂNG KÝ</button>
              </div>
            </div>
          </div>
        )}

        <div className="page-container flex flex-1 items-center justify-between gap-12 pb-[97px] pt-10">
          <div className="max-w-[680px]">
            <h1 className="max-w-[600px] text-[clamp(2.7rem,4.2vw,3.375rem)] font-extrabold leading-[1] tracking-[-0.025em]">
              Bạn đầu tư, chúng<br className="hidden sm:block" /> tôi nuôi cua, bạn<br className="hidden sm:block" /> nhận doanh thu.
            </h1>
            <p className="mt-6 max-w-[540px] text-[15px] leading-6 text-gray-300 md:text-base">
              Mô hình chia sẻ doanh thu minh bạch từ hệ thống nuôi cua trong nhà tuần hoàn RAS (Recirculating Aquaculture System). Đầu tư từng box cua, giám sát 24/7 và nhận lợi nhuận trực tiếp khi thu hoạch.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#goi-dau-tu" className="pill-button border border-white/20 bg-black/90 px-7 py-3 text-xs shadow-lg">CÁC GÓI ĐẦU TƯ</a>
              <a href="#ve-chung-toi" className="pill-button border border-white/50 px-7 py-3 text-xs">CÂU CHUYỆN</a>
            </div>
          </div>
          <button onClick={() => openDialog('intro')} className="hidden h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-white/60 bg-black/30 backdrop-blur-sm transition hover:scale-105 md:flex" aria-label="Giới thiệu CrabShare">
            <img src={asset('imgContainer2.svg')} alt="" />
          </button>
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-[#916026]">
          <div className="page-container grid min-h-[97px] grid-cols-2 items-center gap-4 py-4 md:grid-cols-4">
            <div className="metric"><strong>+50.000+</strong><span>HỘP CUA ĐÃ CUNG CẤP</span></div>
            <div className="metric"><strong>50+</strong><span>BATCH ĐÃ TÀI TRỢ HOÀN TẤT</span></div>
            <div className="metric"><strong>ĐẠT CHUẨN</strong><span>VIETGAP & HACCP</span></div>
            <div className="metric"><strong>35+</strong><span>ĐỐI TÁC TRẠI & BAO TIÊU</span></div>
          </div>
        </div>
      </header>

      <section className="border-b border-gray-100 bg-white" aria-label="Truyền thông và đối tác">
        <div className="page-container flex min-h-[105px] flex-col items-center justify-center gap-6 py-5 lg:flex-row lg:justify-between">
          <span className="shrink-0 border-gray-200 pr-8 text-[12px] font-bold tracking-[0.05em] text-gray-500 lg:border-r">TRUYỀN THÔNG & ĐỐI TÁC</span>
          <div className="flex w-full flex-wrap items-center justify-between gap-x-6 gap-y-4 opacity-80">
            <span className="font-serif text-xl font-bold">Times<span className="ml-0.5 font-sans text-xs font-extrabold text-red-600">LIVE</span></span>
            <span className="text-sm font-extrabold tracking-tight text-blue-900">BUSINESS<span className="font-normal text-cyan-600">TECH</span></span>
            <span className="text-2xl font-extrabold tracking-tight text-red-600">CNN</span>
            <span className="flex gap-[2px] text-xs font-bold text-white"><b className="bg-black px-1.5 py-0.5">B</b><b className="bg-black px-1.5 py-0.5">B</b><b className="bg-black px-1.5 py-0.5">C</b></span>
            <span className="text-base font-bold tracking-widest text-blue-900">SABC<span className="ml-1 inline-block h-2 w-2 rounded-full bg-yellow-400" /></span>
            <span className="text-xl font-extrabold text-red-600">TED<span className="font-light text-black">x</span></span>
          </div>
        </div>
      </section>

      <section id="quy-trinh" className="bg-[#fff1e0] py-20 md:py-24">
        <div className="page-container grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="section-title">Quy trình vận hành</h2>
            <p className="mt-5 max-w-[520px] text-sm leading-6 text-gray-600">Nền tảng CrabShare kết nối bạn với các trang trại nuôi cua tuần hoàn RAS hiện đại, quản lý tự động và chia sẻ doanh thu minh bạch.</p>
            <ol className="mt-10 space-y-6">
              {steps.map((step) => (
                <li key={step.number} className="flex gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#e6cba9] bg-white text-[11px] font-bold">{step.number}</span>
                  <div>
                    <h3 className="text-sm font-bold">{step.title}</h3>
                    <p className="mt-1 max-w-[470px] text-[13px] leading-5 text-gray-600">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#ve-chung-toi" className="pill-button bg-black px-6 py-3 text-[11px] text-white">TÌM HIỂU THÊM</a>
              <button onClick={() => openDialog('faq')} className="pill-button border border-gray-400 px-6 py-3 text-[11px]">HỎI ĐÁP</button>
            </div>
          </div>
          <div className="process-diagram mx-auto">
            <img className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" src={asset('imgContainer4.svg')} alt="" />
            <div className="process-core"><strong>CRAB<br />SHARE</strong><img src={asset('imgContainer8.svg')} alt="" /></div>
            <div className="process-point process-top"><span><img src={asset('imgContainer5.svg')} alt="" /></span><b>Nhà đầu tư</b></div>
            <div className="process-point process-left"><span><img src={asset('imgContainer6.svg')} alt="" /></span><b>Trại nuôi RAS</b></div>
            <div className="process-point process-right"><span><img src={asset('imgContainer7.svg')} alt="" /></span><b>Thị trường / Cửa hàng</b></div>
          </div>
        </div>
      </section>

      <section id="goi-dau-tu" className="bg-white px-4 py-20 md:py-24">
        <div className="mx-auto max-w-[1024px]">
          <h2 className="section-title text-center">Các gói đầu tư CrabShare</h2>
          <div className="mt-7 overflow-x-auto rounded-xl border border-amber-100 bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.22)]">
            <table className="w-full min-w-[760px] border-collapse text-sm">
              <thead>
                <tr className="h-[154px] text-center">
                  <th className="w-1/4 p-6 align-bottom">
                    <span className="inline-flex items-center gap-2 text-left text-[9px] font-bold leading-[1.05]">CRAB<br />SHARE<br />VIETNAM<img src={asset('imgContainer.svg')} alt="" /></span>
                  </th>
                  <th className="w-[37.5%] border-x border-white/60 bg-[#f7e7d2] p-5">
                    <div className="flex flex-col items-center gap-2">
                      <span className="rounded bg-[#e9d4bc] px-2 py-1 text-[9px] tracking-wider">PHỔ BIẾN</span>
                      <img src={asset('imgContainer1.svg')} alt="" />
                      <strong className="text-[14px] tracking-wide">BATCH SLOT</strong>
                      <small className="text-[11px] font-medium text-gray-700">(HỘP NUÔI ĐƠN LẺ)</small>
                    </div>
                  </th>
                  <th className="w-[37.5%] p-5">
                    <div className="flex flex-col items-center gap-2">
                      <img src={asset('imgSymbol.svg')} alt="" />
                      <strong className="text-[14px] tracking-wide">OFFTAKE PRIORITY</strong>
                      <small className="text-[11px] font-medium text-gray-700">(BAO TIÊU & ĐẦU TƯ)</small>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {packages.map((row, index) => (
                  <tr key={row.label} className={index % 2 === 0 ? 'bg-[#faf2e9]' : 'bg-white'}>
                    <th scope="row" className="w-1/4 border-y border-amber-100 px-4 py-4 text-left font-bold">{row.label}</th>
                    <td className="w-[37.5%] border-x border-y border-amber-100 px-4 py-4 text-center">{row.link ? <button onClick={() => openDialog('batch')} className="font-semibold underline underline-offset-2">{row.first}</button> : row.first}</td>
                    <td className="w-[37.5%] border-y border-amber-100 px-4 py-4 text-center">{row.link ? <button onClick={() => openDialog('offtake')} className="font-semibold underline underline-offset-2">{row.second}</button> : row.second}</td>
                  </tr>
                ))}
                <tr className="text-center">
                  <td className="bg-[#faf2e9]" />
                  <td className="border-x border-amber-100 p-4"><button onClick={() => openDialog('batch')} className="pill-button bg-[#8e5d28] px-6 py-2.5 text-[11px] text-white">XEM CHI TIẾT</button></td>
                  <td className="p-4"><button onClick={() => openDialog('offtake')} className="pill-button bg-black px-6 py-2.5 text-[11px] text-white">XEM CHI TIẾT</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-center text-xs leading-5 text-gray-500">*Lợi nhuận dựa trên sản lượng thu hoạch thực tế và cam kết mua lại tối thiểu từ chuỗi bao tiêu.</p>
        </div>
      </section>

      <section id="ve-chung-toi" className="bg-[#f7f5f1] py-20 md:py-24">
        <div className="page-container grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="eyebrow">Ý KIẾN NHÀ ĐẦU TƯ:</p>
            <blockquote className="mt-3 max-w-[620px] text-[clamp(1.8rem,3vw,2.5rem)] font-extrabold leading-[1.12] tracking-tight">
              {testimonial === 1 ? '“Hệ thống camera và nhật ký nước RAS cập nhật mỗi ngày giúp tôi hoàn toàn an tâm.”' : testimonial === 0 ? '“Mọi thông tin về từng box cua đều rõ ràng, tôi dễ dàng theo dõi hành trình đầu tư.”' : '“Tôi đánh giá cao cách CrabShare kết nối nhà đầu tư với trại nuôi và đầu ra.”'}
            </blockquote>
            <p className="mt-5 max-w-[570px] text-sm leading-6 text-gray-600">“Một mô hình đầu tư nông nghiệp công nghệ cao bài bản, kiểm soát rủi ro bằng công nghệ tuần hoàn và đầu ra chuỗi ẩm thực vững chắc.”</p>
            <div className="mt-8 flex items-center gap-4">
              <img className="h-12 w-12 rounded-full border border-amber-300 object-cover" src={asset('imgTrnHoangNam.png')} alt="Trần Hoàng Nam" />
              <div><strong className="block text-sm">Trần Hoàng Nam</strong><span className="text-[10px] font-semibold tracking-wide text-gray-500">NHÀ ĐẦU TƯ BATCH #04 & CHỦ CHUỖI NHÀ HÀNG HẢI SẢN</span></div>
            </div>
            <div className="mt-8 flex items-center gap-2" aria-label="Chọn đánh giá">
              {[0, 1, 2].map((index) => <button key={index} onClick={() => setTestimonial(index)} aria-label={`Đánh giá ${index + 1}`} aria-current={testimonial === index} className={`rounded-full transition-all ${testimonial === index ? 'h-2.5 w-2.5 bg-black' : 'h-1.5 w-1.5 bg-gray-400'}`} />)}
            </div>
          </div>
          <div className="feedback-gallery relative mx-auto h-[410px] w-full max-w-[410px] overflow-hidden rounded-2xl border border-white shadow-xl">
            <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />
          </div>
        </div>
      </section>

      <section id="ung-dung" className="bg-[#f9f8f6] py-20 md:py-24">
        <div className="page-container grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="section-title max-w-[450px] !text-[clamp(2.2rem,3.5vw,3rem)] !leading-[1.08]">Đầu tư và theo dõi cua trong 3 phút.</h2>
            <p className="mt-6 max-w-[430px] text-sm leading-6 text-gray-600">Ứng dụng CrabShare giúp bạn chọn mua slot cua, theo dõi camera và chỉ số sinh học của box nuôi, đồng thời mua hải sản tươi sống giao tận nhà với giá ưu đãi cho cổ đông.</p>
            <button onClick={() => openDialog('contact')} className="pill-button mt-8 bg-black px-8 py-3.5 text-[11px] text-white shadow-lg">TẢI ỨNG DỤNG ĐẦU TƯ</button>
          </div>
          <div className="relative mx-auto w-full max-w-[596px] pb-5 pr-1 md:pr-14">
            <div className="dashboard overflow-hidden rounded-xl border border-gray-300 bg-white shadow-xl">
              <div className="flex h-10 items-center justify-between border-b border-gray-200 px-3 text-[10px] font-semibold"><span>CrabShare App™ - Dashboard Báo Cáo</span><span className="flex gap-1"><i /><i /><i /></span></div>
              <div className="grid min-h-[280px] grid-cols-3 items-center gap-3 px-4">
                <div className="dashboard-card"><strong>SLOT CUA THỊT</strong><span>2.500.000 ₫</span></div>
                <div className="dashboard-card"><strong>SLOT CUA CỐM</strong><span>3.200.000 ₫</span></div>
                <div className="dashboard-card"><strong>GÓI TRẠI 50 BOX</strong><span>50.000.000 ₫</span></div>
              </div>
              <div className="border-t border-gray-200 bg-gray-50 px-4 py-2 text-center text-[9px] text-gray-500">Giám sát trực tiếp nhiệt độ, độ mặn 24/7 & Thanh toán bảo mật</div>
            </div>
            <div className="mx-auto h-3 w-[104%] -translate-x-[2%] rounded-b-2xl bg-gray-300 shadow-md" />
            <div className="phone absolute bottom-0 right-0 hidden h-[336px] w-[176px] rounded-[22px] border-[8px] border-gray-800 bg-white shadow-2xl md:flex">
              <div className="flex w-full flex-col items-center justify-between overflow-hidden rounded-[13px] p-3">
                <div className="h-1 w-8 rounded-full bg-gray-300" />
                <div className="flex flex-col items-center gap-2 text-center"><img src={asset('imgSymbol1.svg')} alt="" /><strong className="text-[10px]">HỘP CUA #084</strong><span className="rounded-full bg-amber-100 px-2 py-1 text-[9px]">Đang Tăng Trưởng</span></div>
                <span className="grid h-6 w-6 place-items-center rounded-full bg-gray-100"><img src={asset('imgContainer9.svg')} alt="" /></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative bg-white pt-6">
        <section className="question-card page-container relative z-10 mx-auto -mb-8 max-w-[960px] overflow-hidden rounded-2xl py-10 text-center text-white shadow-2xl">
          <div className="absolute inset-0 -z-10 bg-black/50" />
          <h2 className="text-[30px] font-extrabold tracking-tight">Bạn có câu hỏi?</h2>
          <div className="mt-5 flex flex-wrap justify-center gap-4">
            <button onClick={() => openDialog('contact')} className="pill-button border border-white/20 bg-black px-7 py-3 text-xs text-white">YÊU CẦU GỌI LẠI</button>
            <button onClick={() => openDialog('faq')} className="pill-button border border-white/60 px-7 py-3 text-xs text-white">HỎI ĐÁP</button>
          </div>
        </section>
        <section id="dang-ky" className="bg-[#916026] px-4 pb-12 pt-20 text-white">
          <div className="mx-auto flex max-w-[960px] flex-col items-center justify-center gap-5 text-center md:flex-row">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">Đăng ký để bắt đầu đầu tư ngay hôm nay</h2>
            <button onClick={() => openDialog('contact')} className="pill-button shrink-0 bg-black px-8 py-3 text-xs">ĐĂNG KÝ</button>
          </div>
        </section>
      </div>

      <footer id="lien-he" className="bg-[#f9f8f6] text-[12px] text-gray-600">
        <div className="page-container grid gap-10 pb-14 pt-16 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <h3 className="footer-title">Thông Tin Liên Hệ</h3>
            <p>Hotline: <a href="tel:1900888626">1900 888 626</a></p>
            <p>Email: <a href="mailto:invest@crabshare.vn">invest@crabshare.vn</a></p>
            <p><strong className="text-gray-800">Trụ sở chính:</strong><br />Khu Công Nghệ Cao,<br />TP. Thủ Đức, TP. Hồ Chí Minh,<br />Việt Nam</p>
          </div>
          <div>
            <h3 className="footer-title">Liên Kết Nhanh</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#dau-trang">Trang chủ</a></li><li><a href="#goi-dau-tu">Gói đầu tư</a></li><li><a href="#quy-trinh">Quy trình nuôi RAS</a></li>
              <li><button onClick={() => openDialog('faq')}>Hỏi đáp (FAQ)</button></li><li><a href="#ung-dung">Cửa hàng hải sản</a></li><li><a href="#ung-dung">Báo cáo tiến độ</a></li>
              <li><a href="mailto:invest@crabshare.vn">Liên hệ đối tác</a></li><li><button onClick={() => openDialog('faq')}>Điều khoản & Hợp đồng</button></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="footer-title">Chứng Nhận Pháp Lý</h3>
            <p>Công ty Cổ phần Công nghệ CrabShare<br /><strong className="text-gray-900">Mã số DN:</strong> 0318928419</p>
            <p>Chứng nhận Tiêu chuẩn Cơ sở Nuôi tuần hoàn<br />Hệ thống RAS & VietGAP Nuôi trồng thuỷ sản<br /><button onClick={() => openDialog('faq')} className="font-semibold underline">Xem Chứng Nhận</button></p>
            <p>Hợp tác chuỗi bao tiêu HACCP & ISO 22000<br /><button onClick={() => openDialog('faq')} className="font-semibold underline">Xem Chứng Nhận</button></p>
          </div>
          <div>
            <h3 className="footer-title">Ứng Dụng</h3>
            <div className="mt-4 flex flex-col items-start gap-2">
              <button onClick={() => openDialog('login')} className="pill-button w-28 bg-black py-2 text-[11px] text-white">ĐĂNG NHẬP</button>
              <button onClick={() => openDialog('contact')} className="pill-button w-28 bg-black py-2 text-[11px] text-white">ĐĂNG KÝ</button>
            </div>
          </div>
        </div>
        <div className="page-container flex flex-col items-center justify-between gap-5 border-t border-gray-200 py-7 text-[11px] sm:flex-row">
          <p>© 2024-2026 CrabShare Vietnam. Bản quyền được bảo hộ.</p>
          <div className="flex items-center gap-5">
            {['imgLinkTwitter.svg', 'imgLinkFacebook.svg', 'imgLinkedIn.svg', 'imgLinkYouTube.svg'].map((icon) => <a key={icon} href="#dau-trang" aria-label={icon.replace('imgLink', '').replace('.svg', '')}><img src={asset(icon)} alt="" /></a>)}
            <a href="tel:1900888626" aria-label="Gọi CrabShare"><img src={asset('imgLinkPhone.svg')} alt="" /></a>
            <a href="mailto:invest@crabshare.vn" aria-label="Email CrabShare"><img src={asset('imgLinkEmail.svg')} alt="" /></a>
          </div>
        </div>
      </footer>

      {dialog && (
        <div className="dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) closeDialog() }}>
          <section className="dialog-panel" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
            <button className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-gray-100 text-xl" onClick={closeDialog} aria-label="Đóng">×</button>
            {dialog === 'contact' && <>
              <h2 id="dialog-title" className="text-2xl font-extrabold">Đăng ký tư vấn</h2>
              {submitted ? <p className="mt-5 rounded-xl bg-green-50 p-4 text-sm text-green-800">Cảm ơn bạn! Đây là bản demo giao diện; thông tin chưa được gửi đến máy chủ.</p> : <>
                <p className="mt-2 text-sm text-gray-600">Để lại thông tin để trải nghiệm biểu mẫu CrabShare.</p>
                <form onSubmit={submitContact} className="mt-6 space-y-4">
                  <label className="block text-sm font-semibold">Họ và tên<input required autoComplete="name" className="form-input" placeholder="Nguyễn Văn A" /></label>
                  <label className="block text-sm font-semibold">Số điện thoại<input required type="tel" autoComplete="tel" pattern="[0-9+ .-]{9,15}" className="form-input" placeholder="090 123 4567" /></label>
                  <button className="pill-button w-full bg-black px-6 py-3 text-xs text-white" type="submit">GỬI THÔNG TIN</button>
                </form>
              </>}
            </>}
            {dialog === 'login' && <>
              <h2 id="dialog-title" className="text-2xl font-extrabold">Đăng nhập CrabShare</h2>
              <p className="mt-2 text-sm text-gray-600">Minh họa giao diện đăng nhập cho bản demo.</p>
              <form onSubmit={submitContact} className="mt-6 space-y-4">
                <label className="block text-sm font-semibold">Email<input required type="email" autoComplete="email" className="form-input" placeholder="you@example.com" /></label>
                <label className="block text-sm font-semibold">Mật khẩu<input required type="password" autoComplete="current-password" className="form-input" placeholder="••••••••" /></label>
                <button className="pill-button w-full bg-black px-6 py-3 text-xs text-white" type="submit">ĐĂNG NHẬP</button>
              </form>
              {submitted && <p className="mt-4 text-sm text-amber-800">Tính năng đăng nhập cần kết nối backend để hoạt động.</p>}
            </>}
            {dialog === 'intro' && <>
              <h2 id="dialog-title" className="text-2xl font-extrabold">CrabShare hoạt động như thế nào?</h2>
              <p className="mt-4 text-sm leading-6 text-gray-600">Chọn gói đầu tư, theo dõi box cua qua dashboard, sau đó nhận chia sẻ doanh thu khi thu hoạch. Video giới thiệu sẽ được bổ sung cho bản demo.</p>
              <a href="#quy-trinh" onClick={closeDialog} className="pill-button mt-6 inline-flex bg-black px-6 py-3 text-xs text-white">XEM QUY TRÌNH</a>
            </>}
            {dialog === 'faq' && <>
              <h2 id="dialog-title" className="text-2xl font-extrabold">Hỏi đáp thường gặp</h2>
              <div className="mt-5 divide-y divide-gray-200">
                {faqs.map((faq, index) => <div key={faq.question} className="py-3"><button className="flex w-full items-center justify-between gap-4 text-left text-sm font-bold" onClick={() => setActiveFaq(index)} aria-expanded={activeFaq === index}>{faq.question}<span>{activeFaq === index ? '−' : '+'}</span></button>{activeFaq === index && <p className="mt-2 text-sm leading-6 text-gray-600">{faq.answer}</p>}</div>)}
              </div>
            </>}
            {(dialog === 'batch' || dialog === 'offtake') && <>
              <h2 id="dialog-title" className="text-2xl font-extrabold">{dialog === 'batch' ? 'Batch Slot' : 'Offtake Priority'}</h2>
              <p className="mt-3 text-sm leading-6 text-gray-600">{dialog === 'batch' ? 'Gói đầu tư từng hộp nuôi đơn lẻ với chu kỳ dự kiến 45–60 ngày, mức đầu tư minh họa 2.500.000 ₫.' : 'Gói bao tiêu và đầu tư với chu kỳ dự kiến 6 tháng–1 năm, mức đầu tư minh họa 50.000.000 ₫.'}</p>
              <p className="mt-3 text-xs text-gray-500">Số liệu theo thiết kế Figma, phục vụ trình diễn giao diện.</p>
              <button onClick={() => openDialog('contact')} className="pill-button mt-6 bg-black px-6 py-3 text-xs text-white">ĐĂNG KÝ TƯ VẤN</button>
            </>}
          </section>
        </div>
      )}
    </div>
  )
}

export default App
