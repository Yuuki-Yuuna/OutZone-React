export default function SectionOne() {
  return (
    <>
      <Section
        number={1}
        title='操作简单 零技术'
        desc='操作人性化图形化界面逻辑清昕高有层次页面设计布局合理，轻松上手，一键云存储'
        image='/section1.jpg'
      ></Section>
      <Section
        number={2}
        title='备份存储 超高性能'
        desc='备份方式多样，第略灵活 快速响应用请求 高效处理教据 提供稳定性能表现'
        image='/section2.png'
      ></Section>
      <Section
        number={3}
        title='可扩展性与低延时'
        desc='横向扩展(Scale-out)架构设计 屏蔽底层的硬件差异 存储容量扩展 业务性能提升 异步操作 快速响应用户请求 提供实时的数据读写服务'
        image='/section3.jpg'
      ></Section>
      <Section
        number={4}
        title='安全可靠'
        desc='数据加密、访问控制、身份认证 数据传输的安全性、防护措施的完善性 安全策略、漏洞管理机制应对安全威胁和攻击'
        image='/section4.jpg'
      ></Section>
    </>
  )
}

function Section({
  number,
  title,
  desc,
  image
}: {
  number: number
  title: string
  desc: string
  image: string
}) {
  return (
    <section className={'section-pc ' + (number % 2 ? 'section-odd' : 'section-even')}>
      <aside style={{ width: window.innerWidth > 768 ? '50%' : '' }}>
        <img className='image' src={image} alt={title} />
      </aside>
      <article style={{ width: window.innerWidth > 768 ? '50%' : '' }}>
        <div className='number'>{number}</div>
        <div className='title'>{title}</div>
        <div className='desc'>{desc}</div>
      </article>
    </section>
  )
}
