import { getProviders, signIn } from "next-auth/react";
import Header from "../../components/Header";
import { HeartIcon } from "@heroicons/react/solid";

export default function SignIn({ providers }) {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-between mt-20">
        <img src="https://links.papareact.com/ocw" alt="" className="w-80" />
        <div className="flex items-center">
          <p>Made with</p>
          <HeartIcon className="w-10 fill-current text-red-500" />
          <p> by Mayank</p>
        </div>
        <div className="mt-20">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                className="bg-blue-400 p-3 rounded-md text-white hover:bg-blue-600"
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
