import { ReleaseNotes } from "../../../../components/release-notes";
import { readChangelog } from "../../../../lib/read-changelog";
export default function Page() {
  return <ReleaseNotes changelog={readChangelog()} />;
}
