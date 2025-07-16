import { TabContainer } from '@/src/components/tab-container'

type UserManagementProps = Readonly<{
  children: React.ReactNode
}>

export default function UserManagementTemplate({
  children,
}: UserManagementProps) {
  return (
    <TabContainer
      menuItems={[{ href: '/user-management', label: 'ข้อมูลผู้ใช้งาน' }]}
    >
      {children}
    </TabContainer>
  )
}
