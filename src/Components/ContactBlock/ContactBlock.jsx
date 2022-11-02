import { useState } from "react";
import style from "./ContactBlock.module.scss";

export default function ContactBlock({item, children}) {
	const [copied, setCopied] = useState(false);

	function copyToClipboard(value) {
		setCopied(p => !p)
		navigator.clipboard.writeText(value)
		setTimeout(() => setCopied(p => !p), 1000)
	}

    return (
        <div
            className={style.contactBlock}
            onClick={() => copyToClipboard(item.text)}
        >
            <div className={style.contactIconWrapper}>
				{ children }
            </div>
            <p>item.text</p>
            {copied && <p className={style.copyMessage}>Copied !</p>}
        </div>
    );
}
