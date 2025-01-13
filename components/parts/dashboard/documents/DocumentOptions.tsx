import DeleteButton from "./DeleteButton";
import ShareButton from "./Sharebutton";


export default function DocumentOptions({ userEmail, docId }:
   { userEmail: string, docId: string })
    {

  return (
    <div className="flex gap-1">
      <DeleteButton userEmail={userEmail} docId={docId}/>
      <ShareButton userEmail={userEmail} docId={docId}/>
    </div>
  );
}
