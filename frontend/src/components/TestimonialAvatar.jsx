function TestimonialAvatar({ src, name, className = "h-[48px] w-[48px]" }) {
  return (
    <img
      src={src || "/unknownProfile.jpg"}
      alt={name ? `${name}'s profile photo` : "Profile photo preview"}
      onError={(event) => {
        if (event.currentTarget.getAttribute("src") !== "/unknownProfile.jpg") {
          event.currentTarget.src = "/unknownProfile.jpg";
        }
      }}
      className={`shrink-0 rounded-full bg-[#D9D9D9] object-cover ${className}`}
    />
  );
}

export default TestimonialAvatar;
