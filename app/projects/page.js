import Window from '@/components/window';

export default function Page() {
  return (
    <div>
      <Window title={'Error'}>ERROR! You can not do that</Window>
      <Window width={400} height={500} title={'Ok!'}>
        Yes, there is no issue
      </Window>
    </div>
  );
}
