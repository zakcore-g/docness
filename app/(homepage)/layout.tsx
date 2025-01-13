import HomeNavbar from "@/components/parts/homepage/navbar"


const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
      <div>
        <HomeNavbar />
        {children}
      </div>
  )
}
export default HomeLayout