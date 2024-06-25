import { BlockObjectResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"
import { DistributiveOmit } from "~/util/types"

// note: we use DistributiveOmit to keep union type info
// otherwise, even if we know type is "paragraph", we won't be
// able to access the paragraph property

export type Block = DistributiveOmit<
	BlockObjectResponse,
	"object" | "parent" | "created_time" | "created_by" |
    "last_edited_time" | "last_edited_by" | "has_children" |
    "archived"
>

export function getPlainText(rt: RichTextItemResponse[]){
	return rt.map(r => r.plain_text).join("");
}