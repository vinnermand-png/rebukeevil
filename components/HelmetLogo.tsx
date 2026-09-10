export default function HelmetLogo({ size = 'small' }: { size?: 'small' | 'large' }) {
  return <div className={`flex items-center gap-3 ${size === 'large' ? 'flex-col gap-5' : ''}`}>
    <img src="/helmet-logo.png" alt="" className={size === 'large' ? 'h-28 w-24 object-contain' : 'h-10 w-9 object-contain'} />
    <span className={`display tracking-[.16em] ${size === 'large' ? 'text-[18px]' : 'text-[16px]'}`}>REBUKEEVIL</span>
  </div>;
}
