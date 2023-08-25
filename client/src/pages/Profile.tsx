import { useParams } from "react-router-dom";
import { useEffect } from "react";

import { getProfile } from "../api/api";

export default function Profile() {
  const { id: userId } = useParams();

  useEffect(() => {
    if (!userId) return;
    
    async function printUserById(userId: string) {
      const user = await getProfile(+userId);
      console.log(user);
    }
    printUserById(userId);
  }, [userId]);

  return <></>;
}
