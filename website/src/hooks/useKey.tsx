import { useEffect } from 'react';

export const useKey = (Key: string, action: () => void) => {
    useEffect(() => {
        function callback(e: KeyboardEvent) {
            if (e.code && e.code.toLowerCase() === Key.toLowerCase()) {
                action()
            }
        }

        document.addEventListener("keydown", callback);

        return function () {
            document.removeEventListener("keydown", callback);
        }
    })
}
