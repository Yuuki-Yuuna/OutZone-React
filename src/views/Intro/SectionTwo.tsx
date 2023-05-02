export default function SectionTwo() {
  return (
    <div className='section-two'>
      <Item
        title='随时随地获取实验环境'
        desc='只要在网络覆盖范围内，学生或者指导教师都可以在云终端获取和保存实验环境，突破了地域和时域的限制，增加了创新实验的灵活性。'
      ></Item>
      <Item
        title='定制个性化实验环境'
        desc='可以定制自己所需的实验环境，安装所需的软件等创新实验环境并保存。基于该平台的实验环境能模拟实时在线、安全隔离、实训人员不受限制等真实实验环境。'
      ></Item>
      <Item
        title='共享云平台实验环境'
        desc='实验指导教师可以定制安装基础操作系统、软件等创新实验环境，学生可以在此环境之上安装自己所需的软件，搭建自己的实验环境并保存。学生也可以把自己的实验环境共享给其他学生和指导教师。'
      ></Item>
    </div>
  )
}

function Item({ image, title, desc }: any) {
  return (
    <div className='item'>
      <div className='image'>img</div>
      <div className='title'>{title}</div>
      <div className='desc'>{desc}</div>
    </div>
  )
}
