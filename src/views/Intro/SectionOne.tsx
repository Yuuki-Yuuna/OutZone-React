import { createStyles, useResponsive } from 'antd-style'

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
  const { styles, cx, theme } = useStyles()
  const { tablet: isPC } = useResponsive()

  return (
    <section
      className={cx(
        isPC ? styles.sectionPC : styles.sectionMobile,
        number % 2 === 0 ? styles.sectionEven : styles.sectionOdd
      )}
    >
      <aside style={{ width: isPC ? '50%' : '' }}>
        <img className={styles.image} src={image} alt={title} />
      </aside>
      <article style={{ width: isPC ? '50%' : '' }}>
        <div className={styles.number}>{number}</div>
        <div className={styles.title}>{title}</div>
        <div className={styles.desc}>{desc}</div>
      </article>
    </section>
  )
}

const useStyles = createStyles(({ token, css }) => {
  return {
    /* SECTION */
    sectionPC: css`
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10em;
      gap: 5em;
    `,
    sectionOdd: css`
      flex-directon: row;
      background: #efedf2;
    `,
    sectionEven: css`
      flex-direction: row-reverse;
      background: #e8ecf8;
    `,
    sectionMobile: css`
      display: flex;
      flex-direction: column !important;
      align-items: center;
      padding: 1em;
    `,
    image: css`
      max-width: 100%;
      max-height: 30em;
      /* 这里设置了图片高度，这是需要的，因为图片本身的高度可能不一致 */
      object-fit: contain;
    `,
    number: css`
      display: inline-block;
      font-size: 4em;
      color: #fff;
      background: #eee;
      padding: 0.25em 0.5em;
      font-weight: bold;
    `,
    title: css`
      font-size: 1.75em;
      transform: translateY(-1em);
      font-weight: bold;
      text-shadow: 1px 1px 6px #fff;
    `,
    desc: css`
      color: #888;
    `
  }
})
