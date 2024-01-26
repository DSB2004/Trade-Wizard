import { Database } from "../app";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { AddBlog } from "../../hook/redux-slice/Blog";
import store from "../../hook/store";
import { showNotification } from "../../util/common/notify-user";

export const BlogsCollection = collection(Database, "blogs");
export const writeBlog = async (content) => {
  try {
    const res = await addDoc(BlogsCollection, content);
    return res;
  } catch (err) {
    showNotification("error")
  }
};
onSnapshot(BlogsCollection, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    const blogData = change.doc.data();
    const blogId = change.doc.id;
    store.dispatch(AddBlog({ id: blogId, ...blogData }));
  });
});
