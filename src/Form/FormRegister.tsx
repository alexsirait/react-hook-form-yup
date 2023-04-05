import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FormInputs } from '../Type/FormInputs';
import toast from 'react-hot-toast';

function later(delay: number) {
	return new Promise((r) => {
		setTimeout(r, delay);
	});
}

export default function FormRegister() {
	const formSchema = Yup.object().shape({
		fullName: Yup.string()
			.required('full name is mandatory ..')
			.min(3, 'full name must be at 3 char long ..'),
		email: Yup.string()
			.required('email is mandatory ..')
			.email('not a proper email ..'),
		password: Yup.string()
			.required('password is mandatory ..')
			.min(3, 'password must be at 3 char long ..')
			.max(12, 'Password maximum 12 characters ..')
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, // eslint-disable-line
				'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
			),
		confirmPassword: Yup.string()
			.required('confirm password is mandatory ..')
			.min(3, 'password must be at 3 char long ..')
			.max(12, 'Password maximum 12 characters ..')
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, // eslint-disable-line
				'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
			)
			.oneOf([Yup.ref('password')], 'confirm password does not match ..'),
		agree: Yup.boolean().oneOf([true], 'agree is mandatory ..'),
		subscribe: Yup.boolean(),
	});
	const formOptions = { resolver: yupResolver(formSchema) };
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<FormInputs>(formOptions);
	const onSubmit = async (data: FormInputs) => {
		await later(3000);
		console.log(data);
		toast.success('Successfully, look at the console ..');
		reset();
	};
	return (
		<div className="p-8">
			<h1 className="text-xl font-bold mb-4">Create new Account</h1>
			<form>
				<div className="mb-2">
					<label className="flex items-center text-gray-800">Full Name *</label>
					<input
						{...register('fullName')}
						type="text"
						name="fullName"
						className="border rounded-lg p-1"
					/>
					<div>
						{errors.fullName && (
							<div className="flex items-center gap-x-2 mt-2 text-red-500 mb-2">
								<div>
									<AiOutlineCloseCircle />
								</div>
								<div>{errors.fullName.message}</div>
							</div>
						)}
					</div>
				</div>
				<div className="mb-2">
					<label className="flex items-center text-gray-800">Email *</label>
					<input
						{...register('email')}
						type="text"
						name="email"
						className="border rounded-lg p-1"
					/>
					<div>
						{errors.email && (
							<div className="flex items-center gap-x-2 mt-2 text-red-500 mb-2">
								<div>
									<AiOutlineCloseCircle />
								</div>
								<div>{errors.email.message}</div>
							</div>
						)}
					</div>
				</div>
				<div className="mb-2">
					<label className="flex items-center text-gray-800">Password *</label>
					<input
						{...register('password')}
						type="password"
						name="password"
						autoComplete="new-password"
						className="border rounded-lg p-1"
					/>
					<div>
						{errors.password && (
							<div className="flex items-center gap-x-2 mt-2 text-red-500 mb-2">
								<div>
									<AiOutlineCloseCircle />
								</div>
								<div>{errors.password.message}</div>
							</div>
						)}
					</div>
				</div>
				<div className="mb-2">
					<label className="flex items-center text-gray-800">
						Confirm Password *
					</label>
					<input
						{...register('confirmPassword')}
						type="password"
						name="confirmPassword"
						autoComplete="new-password"
						className="border rounded-lg p-1"
					/>
					<div>
						{errors.confirmPassword && (
							<div className="flex items-center gap-x-2 mt-2 text-red-500 mb-2">
								<div>
									<AiOutlineCloseCircle />
								</div>
								<div>{errors.confirmPassword.message}</div>
							</div>
						)}
					</div>
				</div>
				<div className="mb-2">
					<input
						{...register('agree')}
						type="checkbox"
						name="agree"
						className="border"
					/>
					<span className="ml-2">
						I Agree to Term of Services and Privacy Policy
					</span>
					<div>
						{errors.agree && (
							<div className="flex items-center gap-x-2 mt-2 text-red-500 mb-2">
								<div>
									<AiOutlineCloseCircle />
								</div>
								<div>{errors.agree.message}</div>
							</div>
						)}
					</div>
				</div>
				<div className="mb-2">
					<input
						{...register('subscribe')}
						type="checkbox"
						name="subscribe"
						className="border"
					/>
					<span className="ml-2">Subscribe to Newsletter</span>
				</div>
				<button
					type="button"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
					onClick={handleSubmit(onSubmit)}
					disabled={isSubmitting}
				>
					Register
				</button>
			</form>
		</div>
	);
}
