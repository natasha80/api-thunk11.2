import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchServices, removeService } from "../actions/actionCreators";
import spinner from "../img/spinner.png";

export default function ServiceList({ history }) {
  const { items, loading, error, deleting } = useSelector(
    (state) => state.serviceList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchServices());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemove = (id) => {
    return () => {
      dispatch(removeService(id));
    };
  };

  if (loading) {
    return (
      <div className="ServiceList">
        <div className="ServiceList__spinner">
          <img src={spinner} alt="spinner" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ServiceList">
        <div className="ServiceList__error">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="ServiceList">
      <button
        className="ServiceList__add"
        onClick={() => history.push(`/services/add`)}
      >
        Добавить услугу
      </button>
      <ul className="ServiceList__list">
        {items.map((item) => (
          <li className="ServiceList__item" key={item.id}>
            <div className="ServiceList__container">
              {item.name}: {item.price.toLocaleString()} руб.
            </div>
            <div className="ServiceList__controls">
              <button onClick={() => history.push(`/services/${item.id}`)}>
                ✎
              </button>
              {deleting.indexOf(item.id) !== -1 ? (
                <div className="ServiceList__button-spinner">
                  <img src={spinner} alt="spinner" />
                </div>
              ) : (
                <button onClick={handleRemove(item.id)}>🞪</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}