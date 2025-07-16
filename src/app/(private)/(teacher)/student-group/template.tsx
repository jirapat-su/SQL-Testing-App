import { TabContainer } from '@/src/components/tab-container'

type StudentGroupTemplateProps = Readonly<{
  children: React.ReactNode
}>

export default function StudentGroupTemplate({
  children,
}: StudentGroupTemplateProps) {
  return (
    <TabContainer
      menuItems={[{ href: '/student-group', label: 'รายการกลุ่มเรียน' }]}
    >
      {children}
    </TabContainer>
  )
}
