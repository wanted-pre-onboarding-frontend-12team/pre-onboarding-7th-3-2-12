import React, { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import ReactDom from 'react-dom';

type Props = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
} & PropsWithChildren;

const Modal = ({ open, setOpen, children }: Props) => {
	if (!open) return null;

	return ReactDom.createPortal(
		<div className="fixed top-0 left-0 right-0 bottom-0 bg-black z-50 opacity-50">
			<dialog open className="fixed max-w-fit bg-white z-50 rounded-xl">
				<button onClick={() => setOpen(false)}>X</button>
				{children}
			</dialog>
		</div>,
		document.getElementById('portal'),
	);
};

export default Modal;
