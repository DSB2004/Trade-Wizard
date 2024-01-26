import { Database } from "../app";
import { collection, addDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import { AddBlog } from "../../hook/redux-slice/Blog";
import store from "../../hook/store";

export const BlogsCollection = collection(Database, "blogs");
export const writeBlog = async (content) => {
  try {
    const res = await addDoc(BlogsCollection, content);
    return res;
  } catch (err) {
    console.log(err);
  }
};
onSnapshot(BlogsCollection, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    const blogData = change.doc.data();
    const blogId = change.doc.id;
    store.dispatch(AddBlog({ id: blogId, ...blogData }));
  });
});
