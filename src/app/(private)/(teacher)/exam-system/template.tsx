import { TabContainer } from '@/src/components/tab-container'

type ExamSystemTemplateProps = Readonly<{
  children: React.ReactNode
}>

export default function ExamSystemTemplate({
  children,
}: ExamSystemTemplateProps) {
  return (
    <TabContainer
      menuItems={[
        { href: '/exam-system', label: 'ข้อมูลการสอบ' },
        { href: '/exam-system/group', label: 'ชุดข้อสอบ' },
      ]}
    >
      {children}
    </TabContainer>
  )
}
