import { ButtonHTMLAttributes } from "react"

type Props = {
  tclass: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: Props) => {
  return (
		<button className={props.tclass} {...props}>
			{props.children}
		</button>
	);
}

export default Button