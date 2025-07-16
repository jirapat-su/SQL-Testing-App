import { TabContainer } from '@/src/components/tab-container'

type ExamManageMentTemplateProps = Readonly<{
  children: React.ReactNode
}>

export default function ExamManagementTemplate({
  children,
}: ExamManageMentTemplateProps) {
  return (
    <TabContainer
      menuItems={[
        { href: '/exam-management', label: 'รายการข้อสอบ' },
        { href: '/exam-management/type', label: 'ประเภทข้อสอบ' },
      ]}
    >
      {children}
    </TabContainer>
  )
}
