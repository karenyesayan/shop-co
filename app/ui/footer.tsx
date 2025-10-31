import Logo from "./logo";
import Link from "next/link";
import Copyright from "./copyright";
import VisaIcon from "@/public/icons/visa.svg";
import GPayIcon from "@/public/icons/g-pay.svg";
import GithubIcon from "@/public/icons/github.svg";
import PayPalIcon from "@/public/icons/paypal.svg";
import TwitterIcon from "@/public/icons/twitter.svg";
import FacebookIcon from "@/public/icons/facebook.svg";
import ApplePayIcon from "@/public/icons/apple-pay.svg";
import InstagramIcon from "@/public/icons/instagram.svg";
import MastercardIcon from "@/public/icons/mastercard.svg";

const siteMap = [
  {
    id: "company",
    name: "Company",
    items: [
      { name: "About", href: "#" },
      { name: "Features", href: "#" },
      { name: "Works", href: "#" },
      { name: "Career", href: "#" },
    ],
  },
  {
    id: "help",
    name: "Help",
    items: [
      { name: "Customer Support", href: "#" },
      { name: "Delivery Details", href: "#" },
      { name: "Terms & Conditions", href: "#" },
      { name: "Privacy Policy", href: "#" },
    ],
  },
  {
    id: "faq",
    name: "FAQ",
    items: [
      { name: "Account", href: "#" },
      { name: "Manage Deliveries", href: "#" },
      { name: "Orders", href: "#" },
      { name: "Payments", href: "#" },
    ],
  },
  {
    id: "resources",
    name: "Resources",
    items: [
      { name: "Free eBooks", href: "#" },
      { name: "Development Tutorial", href: "#" },
      { name: "How to - Blog", href: "#" },
      { name: "Youtube Playlist", href: "#" },
    ],
  },
];

const socialLinks = [
  {
    href: "https://x.com",
    icon: <TwitterIcon className="text-black group-hover/soc:text-white" />,
  },
  {
    href: "https://www.facebook.com",
    icon: <FacebookIcon className="text-black group-hover/soc:text-white" />,
  },
  {
    href: "https://www.instagram.com",
    icon: <InstagramIcon className="text-black group-hover/soc:text-white" />,
  },
  {
    href: "https://github.com",
    icon: <GithubIcon className="text-black group-hover/soc:text-white" />,
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#f0f0f0] px-4 pt-47.5 pb-19 lg:pt-35 xl:pb-20.5">
      <div className="flex flex-col min-[52.125rem]:gap-12.5 xl:mx-auto xl:max-w-310">
        <div className="w-full sm:flex sm:flex-row sm:justify-between xl:items-start">
          <div className="md:mt-6 md:max-w-62 xl:mt-0">
            <Logo size="md" />
            <p className="mt-3.5 text-sm leading-5 font-normal text-[rgba(0,0,0,0.6)] not-italic xl:mt-[1.5625rem] xl:leading-[1.375rem]">
              We have clothes that suits your style and which you’re proud to
              wear. From women to men.
            </p>
            <SocialLinks />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-y-6 xl:mt-2.5 xl:flex xl:w-[70.84677419%] xl:grid-cols-4 xl:justify-between">
            {siteMap.map((section) => (
              <div key={section.id} className="flex flex-col gap-4 xl:gap-6.5">
                <h3
                  id={`${section.name}-heading`}
                  className="text-sm leading-4.5 font-medium tracking-[0.1875rem] text-black uppercase not-italic xl:text-base xl:leading-4.5"
                >
                  {section.name}
                </h3>
                <ul
                  aria-labelledby={`${section.name}-heading`}
                  className="flex flex-col gap-[0.917rem] xl:gap-[0.890625rem]"
                >
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-4 font-normal text-[rgba(0,0,0,0.6)] not-italic hover:underline xl:text-base xl:leading-[1.1875rem]"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-[2.4375rem] border-t border-solid border-[rgba(0,0,0,0.1)] xl:flex xl:justify-between">
          <Copyright />
          <BadgeGroup />
        </div>
      </div>
    </footer>
  );
}

function SocialLinks() {
  return (
    <div className="mt-5 flex gap-3 xl:mt-[2.1875rem]">
      {socialLinks.map(({ href, icon }, index) => (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group/soc box-border flex size-7 items-center justify-center rounded-full border border-solid border-[rgba(0,0,0,0.2)] bg-white transition-colors duration-200 hover:border-black hover:bg-black"
        >
          {icon}
        </a>
      ))}
    </div>
  );
}

function BadgeGroup() {
  return (
    <div className="mt-4 flex justify-center gap-2.5 xl:mt-5 xl:gap-3">
      <div className="flex h-[1.61rem] w-[2.498rem] items-center justify-center rounded-[4.6104px] border-[0.1921px] border-solid border-[#D6DCE5] bg-white shadow-[0px_3.842px_7.684px_rgba(183,183,183,0.08),0px_0.3842px_3.842px_rgba(183,183,183,0.08)] xl:h-[1.876875rem] xl:w-[2.913125rem]">
        <VisaIcon className="h-[0.5625rem] w-7 xl:h-[0.656875rem] xl:w-[2.03375rem]" />
      </div>
      <div className="flex h-[1.61rem] w-[2.498rem] items-center justify-center rounded-[4.6104px] border-[0.1921px] border-solid border-[#D6DCE5] bg-white shadow-[0px_3.842px_7.684px_rgba(183,183,183,0.08),0px_0.3842px_3.842px_rgba(183,183,183,0.08)] xl:h-[1.876875rem] xl:w-[2.913125rem]">
        <MastercardIcon className="h-[0.8125rem] w-5.5 xl:h-[0.980625rem] xl:w-[1.58625rem]" />
      </div>
      <div className="flex h-[1.61rem] w-[2.498rem] items-center justify-center rounded-[4.6104px] border-[0.1921px] border-solid border-[#D6DCE5] bg-white shadow-[0px_3.842px_7.684px_rgba(183,183,183,0.08),0px_0.3842px_3.842px_rgba(183,183,183,0.08)] xl:h-[1.876875rem] xl:w-[2.913125rem]">
        <PayPalIcon className="h-2 w-7.5 xl:h-[0.575625rem] xl:w-[2.159375rem]" />
      </div>
      <div className="flex h-[1.61rem] w-[2.498rem] items-center justify-center rounded-[4.6104px] border-[0.1921px] border-solid border-[#D6DCE5] bg-white shadow-[0px_3.842px_7.684px_rgba(183,183,183,0.08),0px_0.3842px_3.842px_rgba(183,183,183,0.08)] xl:h-[1.876875rem] xl:w-[2.913125rem]">
        <ApplePayIcon className="h-2.5 w-[1.4375rem] xl:h-[0.700625rem] xl:w-[1.650625rem]" />
      </div>
      <div className="flex h-[1.61rem] w-[2.498rem] items-center justify-center rounded-[4.6104px] border-[0.1921px] border-solid border-[#D6DCE5] bg-white shadow-[0px_3.842px_7.684px_rgba(183,183,183,0.08),0px_0.3842px_3.842px_rgba(183,183,183,0.08)] xl:h-[1.876875rem] xl:w-[2.913125rem]">
        <GPayIcon className="h-2.5 w-6 xl:h-[0.700625rem] xl:w-[1.785rem]" />
      </div>
    </div>
  );
}
