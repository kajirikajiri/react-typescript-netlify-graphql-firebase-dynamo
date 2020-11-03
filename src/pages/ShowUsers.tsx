import React, { useState, useEffect } from "react";
import firebase, { db } from "../scripts/firebase";

export default function ShowUsers() {
  const [users, setUsers] = useState<firebase.firestore.DocumentData[]>([]);

  useEffect(() => {
    let result = users;
    const a = db.collection("users").onSnapshot((snapshots) => {
      snapshots.docChanges().forEach((change) => {
        const data = change.doc.data();
        const changeType = change.type;
        switch (changeType) {
          case "added":
            result = [...result, data];
            // ドキュメントが追加された時の処理
            break;
          case "modified":
            console.log(2, data);
            // ドキュメントが変更された時の処理
            break;
          case "removed":
            console.log(3, data);
            // ドキュメントが削除された時の処理
            break;
          default:
            break;
        }
      });
      console.log(result);
      setUsers(result);
    });
    return () => a();
  }, []);
  return (
    <>
      <div>realtime Users for firebase</div>
      {users.map((user) => {
        return (
          <div>
            {user.name}:{new Date(user.createdAt.seconds).toString()}
          </div>
        );
      })}
    </>
  );
}
