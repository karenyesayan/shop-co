export default function Copyright() {
  const currentYear = new Date().getFullYear();

  return (
    <p className="mt-4 text-center text-sm leading-[1.1875rem] font-normal text-[rgba(0,0,0,0.6)] not-italic xl:mt-5">
      Shop.co © 2000-{currentYear}, All Rights Reseved.
    </p>
  );
}
