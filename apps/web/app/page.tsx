import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";

type Props = Omit<ImageProps, "src"> & {
    srcLight: string;
    srcDark: string;
};

const ThemeImage = (props: Props) => {
    const { srcLight, srcDark, ...rest } = props;

    return (
        <>
            <Image {...rest} src={srcLight} className="imgLight" />
            <Image {...rest} src={srcDark} className="imgDark" />
        </>
    );
};

export default function Home() {
    return (
        <div>
            <h1 style={{ textAlign: "center", color: "#383838", background: "#b6fff9ff" }}>
                Dashboard
            </h1>
            <p style={{ textAlign: "center", color: "#383838" }}>
                Welcome to the dashboard! Here you'll find helpful information at a glance.
            </p>
        </div>
    );
}
