/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";



// TODO: Make sure to implement jwt on login and store the access_token of the user in either localStorage or cookies.



const SignIn = ({ switchToSignUp }) => {
    const { signInUser } = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";


    const onSubmit = (data) => {

        const { email, password } = data;
        signInUser(email, password)
            .then(() => {
                toast.success('User Sign In Successfully!')

                navigate(from, { replace: true });
            })
            .catch(error => {
                console.error("Caught Error", error)
            })
    };
    return (


        <div className="lg:w-2/3 xl:w-full mt-12 container p-4 mx-auto">
            <h1 className="text-3xl mb-6 sofadi font-bold text-center text-primary">❣ Please Sign In ❣</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-white">
                <div className="">
                    <label htmlFor="Your Email" className="block text-lg mt-3 dark:text-gray-200">Your Email:</label>
                    <div className="relative flex items-center mt-1">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-white dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </span>

                        <input type="email" name="email" {...register("email", { required: true })} className="block w-full py-3 text-white bg-transparent border rounded-lg px-11 dark:bg-gray-900 dark:text-white dark:border-secondary border-secondary  focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40 placeholder-gray-900 dark:placeholder-gray-400" placeholder="Email address" />
                    </div>
                    {errors.email && <span className="text-red-600">Email is required</span>}
                </div>
                <div className="">
                    <label htmlFor="Your Password" className="block text-lg mt-3 dark:text-gray-200">Your Password:</label>
                    <div className="relative flex items-center mt-1">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-white dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </span>

                        <input type="password" name="password" {...register("password", {
                            required: true,
                            minLength: 6,
                            maxLength: 20,
                            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                        })} className="block w-full px-10 py-3 text-white bg-transparent border rounded-lg dark:bg-gray-900 dark:text-white dark:border-secondary border-secondary  focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40 placeholder-gray-900 dark:placeholder-gray-400" placeholder="Password" />
                    </div>
                    {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                    {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                    {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                    {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
                </div>
                <button className="flex justify-center cursor-pointer items-center rounded-full w-full text-center px-9 py-3 text-xl font-mono font-semibold text-secondary hover:text-white border-2 border-secondary
                         transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-90 hover:bg-secondary duration-300  focus:bg-transparent">
                    Sign In
                </button>
            </form>
            <div className="flex items-center pt-4 space-x-1 text-white">
                <div className="flex-1 h-px sm:w-16 bg-gray-700 dark:bg-gray-300"></div>
                <p className="px-3 text-md dark:text-gray-200">Login with social accounts</p>
                <div className="flex-1 h-px sm:w-16 bg-gray-700 dark:bg-gray-300"></div>
            </div>
            {/* Google Authentication */}
            <div>
                <SocialLogin></SocialLogin>
            </div>
            <p className="text-sm mt-5 text-center sm:px-6 text-white dark:text-gray-200">Don't have an account?
                <Link onClick={switchToSignUp} className="text-md text-primary uppercase dark:text-primary hover:underline"> sign up</Link>
            </p>

        </div>
    );
};

export default SignIn;