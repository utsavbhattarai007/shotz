import react, { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { MdCamera } from "react-icons/md";
import styles from "../styles/pages/Dashboard.module.css";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const { user } = useOutletContext();
  const navigate = useNavigate();
  const [more, setMore] = useState(false);

  // User Input states
  const [data, setData] = useState({
    url: "",
    width: null,
    height: null,
    type: "png",
    block_ads: false,
    block_cookies: false,
    dark_mode: false,
    retina: false,
    full_page: false,
    fresh: false,
  });

  const sendUrl = () => {
    if (data.url === "") {
      setData({});
      return toast.error("Please enter a URL", { id: "url" });
    }
    if (
      (data.width === null && data.height) ||
      (data.height === null && data.width)
    ) {
      setData({});
      return toast.error("Please enter both height and width", { id: "size" });
    }
    navigate("/image", {
      state: data,
    });
  };
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Helmet>
        <title>App - Shotz</title>
      </Helmet>
      <div className={styles.dash_con}>
        <div className={styles.main_con}>
          <div className={styles.header}>
            <h2>Shotz</h2>
            <span>Capture beautiful pictures of website</span>
          </div>
          <div className={styles.input_con}>
            <input
              type="url"
              placeholder="Enter website url"
              name="url"
              value={data.url}
              onChange={handleChange}
              required
            />
            <div className={styles.more} onClick={() => setMore(!more)}>
              {more ? "Hide" : "Show"} Advanced Option
            </div>
            {more && (
              <div className={styles.features_con}>
                <div className={styles.feature}>
                  <label>Browser Size</label>
                  <div className={styles.size_con}>
                    <input
                      type="number"
                      placeholder="Width"
                      name="width"
                      value={data.width}
                      onChange={handleChange}
                    />
                    <input
                      type="number"
                      placeholder="Height"
                      name="height"
                      value={data.height}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className={styles.feature}>
                  <label>File type</label>
                  <div className={styles.select_con}>
                    <select
                      id="file_type"
                      name="type"
                      value={data.type}
                      onChange={handleChange}
                    >
                      <option value="png">png</option>
                      <option value="jpeg">jpeg</option>
                      <option value="webp">webp</option>
                    </select>
                  </div>
                </div>
                <div className={styles.feature}>
                  <label>Options</label>
                  <div className={styles.option_con}>
                    <div className={styles.check_con}>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        name="block_ads"
                        checked={data.block_ads}
                        onChange={() =>
                          setData({ ...data, block_ads: !data.block_ads })
                        }
                      />
                      <span>Block Ads</span>
                    </div>
                    <div className={styles.check_con}>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        name="block_cookies"
                        checked={data.block_cookies}
                        onChange={() =>
                          setData({
                            ...data,
                            block_cookies: !data.block_cookies,
                          })
                        }
                      />
                      <span>No-cookies</span>
                    </div>
                    <div className={styles.check_con}>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        name="dark_mode"
                        checked={data.dark_mode}
                        onChange={() =>
                          setData({ ...data, dark_mode: !data.dark_mode })
                        }
                      />
                      <span>Dark mode</span>
                    </div>
                    <div className={styles.check_con}>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        name="retina"
                        checked={data.retina}
                        onChange={() =>
                          setData({ ...data, retina: !data.retina })
                        }
                      />
                      <span>Retina</span>
                    </div>
                    <div className={styles.check_con}>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        name="full_page"
                        checked={data.full_page}
                        onChange={() =>
                          setData({ ...data, full_page: !data.full_page })
                        }
                      />
                      <span>Full Page screenshot</span>
                    </div>
                    <div className={styles.check_con}>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        name="fresh"
                        checked={data.fresh}
                        onChange={() =>
                          setData({ ...data, fresh: !data.fresh })
                        }
                      />
                      <span>Fresh Screenshot</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <button type="submit" className={styles.btn} onClick={sendUrl}>
              Take a shot
              <MdCamera className={styles.shot} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
