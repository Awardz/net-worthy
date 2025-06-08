export const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    }
};
export const fadeIn = {
    hidden: {
        opacity: 0,
        y: 50
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 10
        }
    }
};
export const cardHover = {
    hover: {
        y: -10,
        scale: 1.03,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 10
        }
    }
};
