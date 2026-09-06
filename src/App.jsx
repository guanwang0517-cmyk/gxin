import { useEffect, useState } from 'react'
import fullPortrait from './assets/guanxin-full.jpg'
import membershipBackground from './assets/membership-00-welcome.jpg'
import membershipOverview from './assets/membership-01-overview.jpg'
import membershipPivot from './assets/membership-pivot.jpg'
import membershipChallenge from './assets/membership-02-challenge.jpg'
import membershipLogic from './assets/membership-03-logic.jpg'
import membershipFlow from './assets/membership-04-flow.jpg'
import membershipConversion from './assets/membership-05-conversion.jpg'
import membershipResearch from './assets/membership-06-research.jpg'
import membershipSummary from './assets/membership-07-summary.jpg'
import membershipJourneys from './assets/membership-08-journeys.jpg'
import membershipMap from './assets/membership-09-map.jpg'
import membershipOutlook from './assets/membership-10-outlook.jpg'
import membershipPhonePair from './assets/membership-phone-pair.png'
import voucherCover from './assets/voucher-01-cover.jpg'
import voucherGoals from './assets/voucher-02-goals.jpg'
import voucherRegion from './assets/voucher-03-region.jpg'
import voucherCompetitors from './assets/voucher-04-competitors.jpg'
import voucherInsights from './assets/voucher-05-insights.jpg'
import voucherPricing from './assets/voucher-06-pricing.jpg'
import voucherLbs from './assets/voucher-07-lbs.jpg'
import voucherAddress from './assets/voucher-08-address.jpg'
import voucherSocial from './assets/voucher-09-social.jpg'
import voucherBackground from './assets/voucher-10-background.jpg'
import voucherOpportunities from './assets/voucher-11-opportunities.jpg'
import voucherSharing from './assets/voucher-12-sharing.jpg'
import voucherEmotion from './assets/voucher-13-emotion.jpg'
import voucherFeedback from './assets/voucher-14-feedback.jpg'
import darkCover from './assets/dark-01-cover.jpg'
import darkResearch from './assets/dark-02-research.jpg'
import darkPersonas from './assets/dark-03-personas.jpg'
import darkCompetitors from './assets/dark-04-competitors.jpg'
import darkSummary from './assets/dark-05-summary.jpg'
import darkPrinciples from './assets/dark-06-principles.jpg'
import darkSystem from './assets/dark-07-system.jpg'
import darkOrders from './assets/dark-08-orders.jpg'
import darkDetails from './assets/dark-09-details.jpg'
import darkMap from './assets/dark-10-map.jpg'
import darkMontage from './assets/dark-11-montage.jpg'
import darkCollaboration from './assets/dark-12-collaboration.jpg'
import darkRetrospective from './assets/dark-13-retrospective.jpg'
import uiHome from './assets/ui-01-home.jpg'
import uiGoods from './assets/ui-02-goods.jpg'
import uiSupermarket from './assets/ui-03-supermarket.jpg'
import greenAppleParticles from './assets/green-apple-particles.png'
import wechatQr from './assets/wechat-qr.png'
import WarpText from './WarpText'
import EchoText from './EchoText'
import HeroFlow from './HeroFlow'

const projects = [
  { no: '01', tag: 'PDD · MEMBERSHIP EXPERIENCE', title: '百亿补贴会员', type: '从普惠式积分工具向高净值用户精细化的战略转型', kind: 'membership', className: 'project-cyan' },
  { no: '02', tag: 'PDD · VOUCHER EXPERIENCE', title: '百亿补贴消费券', type: '百亿补贴营销体系升级', kind: 'voucher', className: 'project-violet' },
  { no: '03', tag: 'PDD · DARK MODE', title: '拼多多暗黑模式', type: '拼多多暗黑模式订单与物流设计规范', kind: 'dark', className: 'project-silver' },
  { no: '04', tag: 'PDD · UI EXPLORATIONS', title: 'UI设计展示', type: '百亿补贴核心模块界面', kind: 'ui', className: 'project-ui' },
]

const membershipPages = [
  membershipBackground, membershipOverview, membershipPivot, membershipChallenge, membershipLogic,
  membershipFlow, membershipConversion, membershipResearch, membershipSummary,
  membershipJourneys, membershipMap, membershipOutlook,
]

const voucherPages = [
  voucherCover, voucherGoals, voucherRegion, voucherCompetitors, voucherInsights,
  voucherPricing, voucherLbs, voucherAddress, voucherSocial, voucherBackground,
  voucherOpportunities, voucherSharing, voucherEmotion, voucherFeedback,
]

const darkPages = [
  darkCover, darkResearch, darkPersonas, darkCompetitors, darkSummary,
  darkPrinciples, darkSystem, darkOrders, darkDetails, darkMap,
  darkMontage, darkCollaboration, darkRetrospective,
]

const uiPages = [uiHome, uiGoods, uiSupermarket]

const strengths = [
  ['01', '体验洞察', '用用户观察与共情找到体验的关键问题，再让方案真正落到每一次操作中。'],
  ['02', 'AI 共创', '将生成式工具融入设计流程，高效探索视觉方向、组件语言与表达边界。'],
  ['03', '系统化设计', '在复杂业务中梳理体验原则与设计规范，让协作更轻、体验更一致。'],
]

const editable = { contentEditable: true, suppressContentEditableWarning: true }

function ProjectPreview({ project }) {
  const targetId = project.kind === 'membership' ? 'membership-case' : project.kind === 'voucher' ? 'voucher-case' : project.kind === 'dark' ? 'dark-case' : project.kind === 'ui' ? 'ui-case' : null
  const goToCase = () => targetId && document.querySelector(`#${targetId}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  const onKeyDown = (event) => {
    if (targetId && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault()
      goToCase()
    }
  }
  return <article className={`project-card case-card contents-card contents-${project.kind}`} onClick={targetId ? goToCase : undefined} onKeyDown={onKeyDown} role={targetId ? 'button' : undefined} tabIndex={targetId ? 0 : undefined} aria-label={targetId ? `查看${project.title}案例` : undefined}>
    <span className="contents-no">{project.no}</span>
    <div className="contents-copy"><h2 {...editable}>{project.title}</h2><p {...editable}>{project.tag}</p><i /><small {...editable}>{project.type}</small></div>
  </article>
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  useEffect(() => {
    const card = document.querySelector('.about-art')
    if (!card) return undefined
    const move = (event) => { const box = card.getBoundingClientRect(); card.style.setProperty('--mesh-x', `${((event.clientX - box.left) / box.width - .5) * 16}deg`); card.style.setProperty('--mesh-y', `${((event.clientY - box.top) / box.height - .5) * -16}deg`) }
    const down = () => card.classList.add('is-meshing')
    const reset = () => { card.classList.remove('is-meshing'); card.style.setProperty('--mesh-x', '0deg'); card.style.setProperty('--mesh-y', '0deg') }
    card.addEventListener('pointermove', move); card.addEventListener('pointerdown', down); card.addEventListener('pointerleave', reset); card.addEventListener('pointerup', reset)
    return () => { card.removeEventListener('pointermove', move); card.removeEventListener('pointerdown', down); card.removeEventListener('pointerleave', reset); card.removeEventListener('pointerup', reset) }
  }, [])
  useEffect(() => {
    const syncPortraitBaseline = () => {
      const art = document.querySelector('.about-art')
      const skills = document.querySelector('.skills')
      if (!art || !skills || window.innerWidth <= 900) return
      const offset = Math.max(0, art.getBoundingClientRect().bottom - skills.getBoundingClientRect().bottom)
      art.style.setProperty('--portrait-baseline-offset', `${offset}px`)
    }
    const frame = requestAnimationFrame(syncPortraitBaseline)
    window.addEventListener('resize', syncPortraitBaseline)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', syncPortraitBaseline) }
  }, [])
  useEffect(() => {
    document.querySelector('body > #static-back-to-top')?.remove()
    const updateBackToTop = () => setShowBackToTop(window.scrollY > window.innerHeight * .85)
    updateBackToTop()
    window.addEventListener('scroll', updateBackToTop, { passive: true })
    return () => window.removeEventListener('scroll', updateBackToTop)
  }, [])
  return <div className="site-shell">
    <div className="noise" />
    <header className="nav-wrap">
      <a className="brand" href="#home" onClick={closeMenu}>GX<span>®</span></a>
      <nav className={menuOpen ? 'nav open' : 'nav'}>
        <a href="#about" onClick={closeMenu}>ABOUT</a><a href="#projects" onClick={closeMenu}>CONTACT</a><span className="project-links" aria-label="项目快捷入口"><a href="#membership-case" onClick={closeMenu}>01</a><a href="#voucher-case" onClick={closeMenu}>02</a><a href="#dark-case" onClick={closeMenu}>03</a><a href="#ui-case" onClick={closeMenu}>04</a></span>
      </nav>
      <a className="nav-contact" href="#contact">SAY BYE <b>↗</b></a>
      <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="展开导航" aria-expanded={menuOpen}>{menuOpen ? 'CLOSE' : 'MENU'}</button>
    </header>

    <main>
      <section className="hero scene-hero" id="home">
        <HeroFlow />
        <div className="hero-content frame">
          <div className="hero-letters rise" aria-hidden="true"><span>G</span><span>U</span><span>A</span><span>N</span><span>X</span><span>I</span><span>N</span></div>
          <div className="apple-wrap rise d1"><div className="apple-halo" /><img src={greenAppleParticles} alt="绿色苹果与分散粒子" fetchPriority="high" decoding="async" /></div>
          <div className="portfolio-title rise d2"><WarpText text="PORTFOLIO" color="#000000" warpStrength={0.08} warpScale={1.7} speed={0.55} pointerInfluence={0.42} pointerStrength={0.38} refraction={0.018} fontSize="clamp(5.4rem, 13.7vw, 15.6rem)" fontWeight={800} style={{ height: '320px' }} /></div>
          <div className="hero-foot rise d3"><p>UE UX DESIGN&nbsp; ☺</p><a href="#projects" className="scroll-prompt">SELECTED WORKS 2023—2026 <i>↓</i></a></div>
        </div>
      </section>

      <section className="about-rebuild" id="about">
        <div className="about-art"><img src={fullPortrait} alt="官馨" loading="lazy" decoding="async" /><div className="trait-list"><button>INFJ绿老头</button><button>白羊座</button><button>呼伦贝尔</button><button>有一只西高地</button></div></div>
        <div className="about-details"><div className="about-echo"><EchoText text="About Me" echoes={12} lag={0.24} offset={36} direction="right" fade={0.72} blur={3} tint="#a6c4aa" mode="both" cursorRadius={320} duration={900} ease="ease-out" fontSize="clamp(57px, 6.3vw, 104px)" fontWeight={700} color="#484947" /></div><div className="about-panel"><div className="about-glow-content"><div className="about-columns"><section><h3>基本信息</h3><p>姓名：官馨<br/>出生日期：1996.04.17<br/>电话号码：18651696339<br/>邮箱：guanxin0221@163.com</p></section><section><h3>教育经历</h3><p>2020–2023 南京航空航天大学<br/>机械工业设计方向硕士<br/>2023年优秀毕业生</p></section></div><section className="work-history"><h3>工作经历</h3><p><b>2023.05–2026.07 上海拼多多</b><br/>主站百亿补贴 交互设计师<br/>1. 负责百亿补贴核心频道交互&UI设计，覆盖频道首页、商品详情页、增长玩法等核心模块，服务千万级日活用户。<br/>2. 主导3个重点项目从方案设计到全量落地，依托用户调研、线上数据复盘、AB测试迭代转化漏斗与核心用户路径，优化体验同时驱动GMV提升；近半年设计自研优化项目累计贡献GMV超2000万。<br/>3. 联动产品、运营、视觉、前端团队，搭建并维护百亿补贴业务设计规范，提升多业务线体验一致性，降低跨团队协作成本。<br/>4. 承担Temu跨境出海相关设计工作，参与10+海外国家开站落地，完成多国地址链路、地区合规类需求的交互与UI适配，熟悉国际化多地域的体验差异与落地流程。</p><p><b>2022.02–2022.08 杭州网易</b><br/>雷火工作室 交互设计师<br/>• 参与《漫威对决》及新版PVP交互设计，协同团队推动24项需求落地，涵盖日常优化、赛季活动、新版本、CG剧情及2.0英雄包装等模块。<br/>• 配合策划把控程序可用性与动效视觉表现，进行组内分享2次，输出可用性问题20+项（含交互/视觉/动效），助力提升玩家体验。</p></section><section className="skills"><h3>技能/证书及其他</h3><div className="tool-row"><span>◇</span><span>Figma</span><span>Ps</span><span>Ai</span><span>Ae</span><span>✕</span></div><p>CET6　 计算机二级　 普通话二甲</p></section></div></div></div>
      </section>

      <section className="projects frame" id="projects"><div className="case-board"><div className="case-liquid" aria-hidden="true" /><div className="case-board-side"><p>© GUAN XIN · INTERACTION DESIGN</p><div><h2>Contact<br/>Cases</h2><span>↗</span></div></div><div className="work-grid">{projects.map((project) => <ProjectPreview project={project} key={project.no} />)}</div></div><div className="membership-gallery" id="membership-case">{membershipPages.map((page, index) => <figure className="membership-spread" key={page}><img src={page} alt={`百亿补贴会员项目展示 ${index + 1}`} loading="lazy" decoding="async" />{index === 0 && <img className="membership-phone-pair" src={membershipPhonePair} alt="百亿补贴会员双手机模型" loading="lazy" decoding="async" />}</figure>)}</div><div className="voucher-gallery" id="voucher-case">{voucherPages.map((page, index) => <figure className={`voucher-spread ${index === voucherPages.length - 1 ? 'voucher-spread-dark' : ''}`} key={page}><img src={page} alt={`百亿补贴消费券项目展示 ${index + 1}`} loading="lazy" decoding="async" /></figure>)}</div><div className="dark-gallery" id="dark-case">{darkPages.map((page, index) => <figure className="dark-spread" key={page}><img src={page} alt={`拼多多暗黑模式项目展示 ${index + 1}`} loading="lazy" decoding="async" /></figure>)}</div><div className="ui-gallery" id="ui-case">{uiPages.map((page, index) => <figure className="ui-spread" key={page}><img src={page} alt={`百亿补贴 UI 设计展示 ${index + 1}`} loading="lazy" decoding="async" /></figure>)}</div></section>
    </main>

    <section className="contact-section scene-hero" id="contact"><HeroFlow /><div className="contact-content frame"><div className="hero-letters contact-letters rise" aria-hidden="true"><span>P</span><span>O</span><span>R</span><span>T</span><span>F</span><span>O</span><span>L</span><span>I</span><span>O</span></div><div className="apple-wrap rise d1"><div className="apple-halo" /><img src={greenAppleParticles} alt="绿色苹果与分散粒子" /></div><div className="contact-title portfolio-title rise d2"><WarpText text="THANKS" color="#000000" warpStrength={0.08} warpScale={1.7} speed={0.55} pointerInfluence={0.42} pointerStrength={0.38} refraction={0.018} fontSize="clamp(5.4rem, 13.7vw, 15.6rem)" fontWeight={800} style={{ height: '320px' }} /></div><div className="contact-foot rise d3"><div className="contact-details"><a className="email-link" href="mailto:guanxin0221@163.com" data-tip="点击发送邮件">EMAIL : guanxin0221@163.com</a><a href="tel:+8618651696339">TEL : 186 5169 6339</a></div><figure className="wechat-qr"><img src={wechatQr} alt="官馨微信二维码" /></figure></div></div></section>
    <button className={`back-to-top ${showBackToTop ? 'is-visible' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="回到页面顶部" title="回到顶部"><span>↑</span></button>
  </div>
}
